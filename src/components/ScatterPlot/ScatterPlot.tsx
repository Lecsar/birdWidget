import { useRef, useEffect } from "react";
import * as d3 from "d3";

import "./ScatterPlot.css";

interface DataPoint {
  trip_distance: number;
  tip_amount: number;
}

interface Props {
  trips: DataPoint[];
  width?: number;
  height?: number;
}

export const ScatterPlot = ({ trips, width = 600, height = 400 }: Props) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);

      svg.selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const calculatedWidth = width - margin.left - margin.right;
      const calculatedHeight = height - margin.top - margin.bottom;

      const x = d3
        .scaleLinear()
        .domain([0, Number(d3.max(trips, (d) => d.trip_distance))])
        .range([0, calculatedWidth]);

      const y = d3
        .scaleLinear()
        .domain([0, Number(d3.max(trips, (d) => d.tip_amount))])
        .range([calculatedHeight, 0]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g")
        .attr("transform", `translate(0,${calculatedHeight})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("class", "axis-label")
        .attr("x", calculatedWidth / 2)
        .attr("y", 35)
        .style("text-anchor", "middle")
        .text("Distance (miles)");

      g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -calculatedHeight / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Tips ($)");

      const tooltip = d3.select("body").append("div").attr("class", "tooltip");

      const mouseover = (event: any, d: DataPoint) => {
        tooltip
          .html(`Distance: ${d.trip_distance} - Tip: $${d.tip_amount}`)
          .style("opacity", 1)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      };

      const mousemove = (event: any) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      };

      const mouseleave = () => {
        tooltip.style("opacity", 0);
      };

      g.selectAll(".dot")
        .data(trips)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => x(d.trip_distance))
        .attr("cy", (d) => y(d.tip_amount))
        .attr("r", 5)
        .attr("fill", "blue")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    }
  }, [trips, width, height]);

  return (
    <svg
      ref={d3Container}
      className="d3-component"
      width={width}
      height={height}
    />
  );
};

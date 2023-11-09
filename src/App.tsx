import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useDataLoader } from "./hooks/useDataLoader";
import { apiGetTaxiTripsInfo } from "./api/api";

import "./App.css";
import { Widget } from "./Widget";

export function App() {
  const { data, loading } = useDataLoader(apiGetTaxiTripsInfo);

  if (loading === "loading") {
    return <h1>Loading...</h1>;
  }

  if (loading === "error") {
    return <h1>Error</h1>;
  }

  if (loading === "idle") {
    return null;
  }

  return (
    <Router>
      <Widget trips={data.data} />
    </Router>
  );
}

import { render, act, screen } from "@testing-library/react";
import { useQueryParamState } from "./useQueryParamState";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

function TestComponent({ paramKey }: { paramKey: string }) {
  const [paramValue, setParamValue] = useQueryParamState(paramKey);

  return (
    <div>
      <div data-testid="paramValue">{paramValue}</div>
      <button onClick={() => setParamValue("newValue")}>Set New Value</button>
      <button onClick={() => setParamValue("")}>Clear Value</button>
    </div>
  );
}

describe("useQueryParamState", () => {
  it("sets initial value from URL and can update it", () => {
    const history = createMemoryHistory({
      initialEntries: ["/test?param=initial"],
    });

    render(
      <Router history={history}>
        <TestComponent paramKey="param" />
      </Router>
    );

    expect(screen.getByTestId("paramValue").textContent).toBe("initial");

    act(() => {
      screen.getByText("Set New Value").click();
    });

    expect(screen.getByTestId("paramValue").textContent).toBe("newValue");
    expect(history.location.search).toBe("?param=newValue");
  });

  it("clears the value from URL", () => {
    const history = createMemoryHistory({
      initialEntries: ["/test?param=something"],
    });

    render(
      <Router history={history}>
        <TestComponent paramKey="param" />
      </Router>
    );

    expect(screen.getByTestId("paramValue").textContent).toBe("something");

    act(() => {
      screen.getByText("Clear Value").click();
    });

    expect(screen.getByTestId("paramValue").textContent).toBe("");
    expect(history.location.search).toBe("");
  });
});

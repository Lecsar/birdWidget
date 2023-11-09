import { render, act, screen } from "@testing-library/react";
import { useQueryParamState } from "./useQueryParamState";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import React from "react";

// Создаем функциональный компонент для тестирования хука
function TestComponent({ paramKey }) {
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

    // Проверяем начальное значение из URL
    expect(screen.getByTestId("paramValue").textContent).toBe("initial");

    // Обновляем значение
    act(() => {
      screen.getByText("Set New Value").click();
    });

    // Проверяем новое значение
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

    // Проверяем начальное значение
    expect(screen.getByTestId("paramValue").textContent).toBe("something");

    // Очищаем значение
    act(() => {
      screen.getByText("Clear Value").click();
    });

    // Проверяем, что значение было очищено
    expect(screen.getByTestId("paramValue").textContent).toBe("");
    expect(history.location.search).toBe("");
  });
});

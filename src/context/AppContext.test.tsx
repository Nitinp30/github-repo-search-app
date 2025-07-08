import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AppProvider, useApp } from "./AppContext";

function TestComponent() {
  const { state, dispatch } = useApp();

  return (
    <>
      <div data-testid="query">{state.query}</div>
      <button onClick={() => dispatch({ type: "SET_QUERY", payload: "react" })}>
        Set Query
      </button>
    </>
  );
}

describe("AppContext", () => {
  it("should provide initial state", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(screen.getByTestId("query").textContent).toBe("");
  });

  it("should update state when dispatch is called", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const button = screen.getByText("Set Query");

    // Wrap click inside `act()` to satisfy React
    await act(async () => {
      button.click();
    });

    // Wait for DOM to reflect state
    await waitFor(() => {
      expect(screen.getByTestId("query").textContent).toBe("react");
    });
  });

  it("should throw error when used outside AppProvider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const BadComponent = () => {
      expect(() => useApp()).toThrow(
        "useApp must be used within an AppProvider",
      );
      return null;
    };

    render(<BadComponent />);
    errorSpy.mockRestore();
  });
});

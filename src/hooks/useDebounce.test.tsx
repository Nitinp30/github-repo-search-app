import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { vi } from "vitest";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce the value change", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "one", delay: 300 },
      },
    );

    expect(result.current).toBe("one");

    // Change value before delay
    rerender({ value: "two", delay: 300 });

    // Value hasn't updated yet
    expect(result.current).toBe("one");

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Debounced value should now be updated
    expect(result.current).toBe("two");
  });

  it("should clear timeout on unmount", () => {
    const { unmount } = renderHook(() => useDebounce("cleanup", 500));
    expect(() => {
      unmount();
      act(() => {
        vi.runAllTimers();
      });
    }).not.toThrow();
  });
});

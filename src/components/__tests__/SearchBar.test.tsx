import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { vi } from "vitest";

vi.mock("../../context/AppContext", () => {
  return {
    useApp: vi.fn(),
  };
});

vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

vi.mock("../../services/githubApi", () => ({
  searchRepositories: vi.fn(),
}));

import { useApp } from "../../context/AppContext";
import { searchRepositories } from "../../services/githubApi";

describe("SearchBar", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        query: "",
        loading: false,
      },
      dispatch: mockDispatch,
    });
  });

  it("renders input with placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/search github repositories/i),
    ).toBeInTheDocument();
  });

  it("calls handleSearch on submit", async () => {
    // @ts-ignore
    searchRepositories.mockResolvedValueOnce({
      total_count: 1,
      items: [
        { id: 1, name: "vite", owner: { login: "vitejs", avatar_url: "" } },
      ],
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search github repositories/i);
    fireEvent.change(input, { target: { value: "vite" } });

    const form = input.closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(searchRepositories).toHaveBeenCalledWith("vite", 1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_QUERY",
        payload: "vite",
      });
    });
  });

  it("clears the input when clear button is clicked", () => {
    // Re-mock useApp to have query
    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        query: "vite",
        loading: false,
      },
      dispatch: mockDispatch,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search github repositories/i);
    fireEvent.change(input, { target: { value: "vite" } });

    const clearBtn = screen.getByRole("button");
    fireEvent.click(clearBtn);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_QUERY",
      payload: "",
    });
  });

  it("shows loading spinner when loading is true", () => {
    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        query: "",
        loading: true,
      },
      dispatch: mockDispatch,
    });

    render(<SearchBar />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

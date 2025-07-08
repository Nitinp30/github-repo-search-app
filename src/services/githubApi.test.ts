import { searchRepositories, getRepositoryDetails } from "./githubApi";
import { Repository, SearchResponse } from "../types";
import { describe, it, expect, vi, afterEach } from "vitest";

global.fetch = vi.fn();
const mockedFetch = fetch as jest.Mock;

describe("GitHub API Service", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("searchRepositories", () => {
    it("should fetch repositories and return data", async () => {
      const mockData: SearchResponse = {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 1,
            name: "vite",
            full_name: "vitejs/vite",
            description: "Next Generation Frontend Tooling", // or null
            html_url: "https://github.com/vitejs/vite",
            stargazers_count: 50000,
            updated_at: "2023-01-01T00:00:00Z",
            created_at: "2020-01-01T00:00:00Z",
            forks_count: 1000,
            language: "TypeScript",
            open_issues_count: 123,
            owner: {
              login: "vitejs",
              avatar_url:
                "https://avatars.githubusercontent.com/u/whatever?v=4",
            },
          },
        ],
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await searchRepositories("vite", 1);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result.total_count).toBe(1);
      expect(result.items[0].name).toBe("vite");
    });

    it("should throw error on empty query", async () => {
      await expect(searchRepositories("", 1)).rejects.toThrow(
        "Search query cannot be empty."
      );
    });
  });

  describe("getRepositoryDetails", () => {
    it("should fetch single repository details", async () => {
      const mockRepo: Repository = {
        id: 1,
        name: "vite",
        full_name: "vitejs/vite",
        description: "Vite repo",
        html_url: "https://github.com/vitejs/vite",
        stargazers_count: 123,
        updated_at: "2023-01-01T00:00:00Z",
        forks_count: 50,
        language: "TypeScript",
        open_issues_count: 10,
        created_at: "2020-01-01T00:00:00Z",
        owner: {
          login: "vitejs",
          avatar_url: "https://avatars.githubusercontent.com/u/whatever?v=4",
        },
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepo,
      } as Response);

      const result = await getRepositoryDetails("vitejs", "vite");

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result.full_name).toBe("vitejs/vite");
    });
  });
});

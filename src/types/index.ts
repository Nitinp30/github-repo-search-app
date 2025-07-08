export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface AppState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
  query: string;
  hasSearched: boolean;
}

export type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "SET_REPOSITORIES";
      payload: { repositories: Repository[]; totalCount: number };
    }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_HAS_SEARCHED"; payload: boolean };

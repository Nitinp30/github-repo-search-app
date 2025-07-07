
export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
  query: string;
  hasSearched: boolean;
}

export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_HAS_SEARCHED'; payload: boolean };
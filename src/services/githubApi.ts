import { Repository, SearchResponse } from '../types';

const BASE_URL = import.meta.env.VITE_GITHUB_URL;

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithErrorHandling(url: string): Promise<Response> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new ApiError('API rate limit exceeded. Please try again later.', 403);
      }
      if (response.status === 422) {
        throw new ApiError('Invalid search query. Please try different keywords.', 422);
      }
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }
    
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please check your connection and try again.', 0);
  }
}

export async function searchRepositories(query: string, page: number = 1): Promise<SearchResponse> {
  if (!query.trim()) {
    throw new ApiError('Search query cannot be empty.', 400);
  }

  const url = `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&per_page=10&page=${page}&sort=stars&order=desc`;
  
  const response = await fetchWithErrorHandling(url);
  const data: SearchResponse = await response.json();
  
  return data;
}

export async function getRepositoryDetails(owner: string, repo: string): Promise<Repository> {
  const url = `${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  
  const response = await fetchWithErrorHandling(url);
  const data: Repository = await response.json();
  
  return data;
}
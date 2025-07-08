import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Pagination } from '../Pagination';
import * as githubApi from '../../services/githubApi';
import React from 'react';
import { vi } from 'vitest';

// Mock the searchRepositories API
vi.mock('../../services/githubApi');

// Base mock state
let customState = {
  repositories: [{ id: 1, name: 'test-repo', owner: { login: 'user', avatar_url: '' } }],
  totalCount: 30,
  currentPage: 2,
  query: 'vite',
  loading: false,
  hasSearched: true,
  error: null,
};

// Mock dispatch function
const mockDispatch = vi.fn();

// Mock useApp using the current customState
vi.mock('../../context/AppContext', () => ({
  useApp: () => ({
    state: customState,
    dispatch: mockDispatch,
  }),
}));

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset state before each test
    customState = {
      repositories: [{ id: 1, name: 'test-repo', owner: { login: 'user', avatar_url: '' } }],
      totalCount: 30,
      currentPage: 2,
      query: 'vite',
      loading: false,
      hasSearched: true,
      error: null,
    };

    (githubApi.searchRepositories as any).mockResolvedValue({
      items: [{ id: 1, name: 'mock-repo', owner: { login: 'user', avatar_url: '' } }],
      total_count: 30,
    });
  });

  it('does not render if hasSearched is false', () => {
    customState.hasSearched = false;
    render(<Pagination />);
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('renders correct pagination buttons', () => {
    render(<Pagination />);
    expect(screen.getByRole('button', { name: /Previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // current page
  });

  it('calls API and dispatch on next page click', async () => {
    customState.currentPage = 1;
    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(githubApi.searchRepositories).toHaveBeenCalledWith('vite', 2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CURRENT_PAGE', payload: 2 });
    });
  });

  it('disables previous button on first page', () => {
    customState.currentPage = 1;
    render(<Pagination />);
    const prevBtn = screen.getByRole('button', { name: /Previous/i });
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    customState.currentPage = 3; // Last page
    customState.totalCount = 30; // 3 pages max
    render(<Pagination />);
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    expect(nextBtn).toBeDisabled();
  });
});

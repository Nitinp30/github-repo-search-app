import { render, screen } from '@testing-library/react'
import { RepositoryList } from '../RepositoryList'
import { vi } from 'vitest'

// ✅ Mock RepositoryCard
vi.mock('../RepositoryCard', () => ({
  RepositoryCard: ({ repository }: any) => (
    <div data-testid="RepositoryCard">{repository.name}</div>
  ),
}))

// ✅ Mock useApp()
vi.mock('../../context/AppContext', () => ({
  useApp: vi.fn(),
}))

import { useApp } from '../../context/AppContext'

describe('RepositoryList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner when loading', () => {
    // @ts-ignore
    useApp.mockReturnValue({
      state: { loading: true },
    })

    render(<RepositoryList />)
    expect(screen.getByText(/searching repositories/i)).toBeInTheDocument()
  })

  it('shows error message on error', () => {
    // @ts-ignore
    useApp.mockReturnValue({
      state: { error: 'Something went wrong', loading: false },
    })

    render(<RepositoryList />)
    expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('shows no results when search was made but no repositories found', () => {
    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        loading: false,
        error: null,
        hasSearched: true,
        repositories: [],
      },
    })

    render(<RepositoryList />)
    expect(screen.getByText(/no repositories found/i)).toBeInTheDocument()
  })

  it('shows prompt when no search has been made yet', () => {
    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        loading: false,
        error: null,
        hasSearched: false,
        repositories: [],
      },
    })

    render(<RepositoryList />)
    expect(screen.getByText(/start your search/i)).toBeInTheDocument()
  })

  it('renders list of repositories when data is available', () => {
    const mockRepos = [
      {
        id: 1,
        name: 'vite',
      },
      {
        id: 2,
        name: 'react',
      },
    ]

    // @ts-ignore
    useApp.mockReturnValue({
      state: {
        loading: false,
        error: null,
        hasSearched: true,
        repositories: mockRepos,
        totalCount: 2,
        query: 'js',
      },
    })

    render(<RepositoryList />)
    expect(screen.getByText('Found 2 repositories for "js"')).toBeInTheDocument()
    expect(screen.getAllByTestId('RepositoryCard')).toHaveLength(2)
    expect(screen.getByText('vite')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
  })
})

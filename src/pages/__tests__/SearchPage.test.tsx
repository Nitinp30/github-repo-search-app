import { render, screen } from '@testing-library/react'
import { SearchPage } from '../SearchPage'
import { vi } from 'vitest'

// ✅ Mock child components
vi.mock('../../components/SearchBar', () => ({
  SearchBar: () => <div data-testid="SearchBar" />,
}))

vi.mock('../../components/RepositoryList', () => ({
  RepositoryList: () => <div data-testid="RepositoryList" />,
}))

vi.mock('../../components/Pagination', () => ({
  Pagination: () => <div data-testid="Pagination" />,
}))

describe('SearchPage', () => {
  it('renders title, description, and child components', () => {
    render(<SearchPage />)

    // ✅ Check static text
    expect(
      screen.getByText('GitHub Repository Explorer')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Discover and explore amazing GitHub repositories')
    ).toBeInTheDocument()

    // ✅ Check child components
    expect(screen.getByTestId('SearchBar')).toBeInTheDocument()
    expect(screen.getByTestId('RepositoryList')).toBeInTheDocument()
    expect(screen.getByTestId('Pagination')).toBeInTheDocument()
  })
})

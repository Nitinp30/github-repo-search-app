import { render, screen, waitFor } from '@testing-library/react'
import { RepositoryDetailsPage } from '../RepositoryDetailsPage'
import { getRepositoryDetails } from '../../services/githubApi'
import { Repository } from '../../types'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>
  return {
    ...actual,
    useParams: () => ({ owner: 'vitejs', repo: 'vite' }),
  }
})

// 🧪 Mock API
vi.mock('../../services/githubApi', () => ({
  getRepositoryDetails: vi.fn(),
}))

const mockRepository: Repository = {
  id: 1,
  name: 'vite',
  full_name: 'vitejs/vite',
  description: 'Mocked description',
  html_url: 'https://github.com/vitejs/vite',
  stargazers_count: 10000,
  forks_count: 2000,
  open_issues_count: 100,
  language: 'TypeScript',
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  owner: {
    login: 'vitejs',
    avatar_url: 'https://avatars.githubusercontent.com/u/123?v=4',
  },
}

describe('RepositoryDetailsPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading spinner and then repository details', async () => {
    // @ts-ignore
    getRepositoryDetails.mockResolvedValue(mockRepository)

    render(
      <MemoryRouter>
        <RepositoryDetailsPage />
      </MemoryRouter>
    )

    // ✅ Shows loading spinner initially
    expect(screen.getByRole('status')).toBeInTheDocument()

    // ✅ Wait for repository name to appear
    await waitFor(() => {
      expect(screen.getByText('vite')).toBeInTheDocument()
    })

    expect(screen.getByText('vitejs')).toBeInTheDocument()
    expect(screen.getByText('Mocked description')).toBeInTheDocument()
    expect(getRepositoryDetails).toHaveBeenCalledWith('vitejs', 'vite')
  })

  it('shows error if API fails', async () => {
    // @ts-ignore
    getRepositoryDetails.mockRejectedValue(new Error('Failed to fetch'))

    render(
      <MemoryRouter>
        <RepositoryDetailsPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument()
    })
  })
})

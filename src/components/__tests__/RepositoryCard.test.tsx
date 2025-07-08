import { render, screen } from '@testing-library/react'
import { RepositoryCard } from '../RepositoryCard'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

// ✅ Mock util functions
vi.mock('../../utils/format', () => ({
  formatNumber: (num: number) => `#${num}`,
}))

vi.mock('../../utils/languageColors', () => ({
  getLanguageColor: (lang: string) => 'bg-red-500',
}))

// ✅ Mock repo data
const mockRepo = {
  id: 1,
  name: 'vite',
  full_name: 'vitejs/vite',
  html_url: 'https://github.com/vitejs/vite',
  description: 'Fast frontend tooling',
  stargazers_count: 12345,
  forks_count: 6789,
  open_issues_count: 10,
  language: 'TypeScript',
  created_at: '2020-01-01',
  updated_at: '2023-01-01',
  owner: {
    login: 'vitejs',
    avatar_url: 'https://avatars.githubusercontent.com/u/123?v=4',
  },
}

describe('RepositoryCard', () => {
  it('renders all repository details correctly', () => {
    render(
      <BrowserRouter>
        <RepositoryCard repository={mockRepo} />
      </BrowserRouter>
    )

    // ✅ Avatar & name
    expect(screen.getByAltText('vitejs')).toBeInTheDocument()
    expect(screen.getByText('vite')).toBeInTheDocument()
    expect(screen.getByText('vitejs')).toBeInTheDocument()

    // ✅ Description
    expect(screen.getByText('Fast frontend tooling')).toBeInTheDocument()

    // ✅ Stats
    expect(screen.getByText('#12345')).toBeInTheDocument()
    expect(screen.getByText('#6789')).toBeInTheDocument()
    expect(screen.getByText('#10')).toBeInTheDocument()

    // ✅ Language
    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    // ✅ External link
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', 'https://github.com/vitejs/vite')
  })
})

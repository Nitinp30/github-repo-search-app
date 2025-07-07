import { RepositoryCard } from './RepositoryCard';
import { useApp } from '../context/AppContext';
import { AlertCircle, Search } from 'lucide-react';

export function RepositoryList() {
  const { state } = useApp();

  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Searching repositories...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 max-w-md mx-auto">{state.error}</p>
        </div>
      </div>
    );
  }

  if (state.hasSearched && state.repositories.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No repositories found</h3>
          <p className="text-gray-600">Try adjusting your search query or check for typos.</p>
        </div>
      </div>
    );
  }

  if (!state.hasSearched) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
          <p className="text-gray-600">Enter a keyword to find GitHub repositories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {state.totalCount.toLocaleString()} repositories for "{state.query}"
        </p>
      </div>
      <div className="grid gap-4">
        {state.repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </div>
  );
}
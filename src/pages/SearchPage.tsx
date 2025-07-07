import { SearchBar } from '../components/SearchBar';
import { RepositoryList } from '../components/RepositoryList';
import { Github } from 'lucide-react';
import { Pagination } from '../components/Pagination';

export function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Github className="w-12 h-12 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHub Repository Explorer</h1>
          <p className="text-gray-600 text-lg">Discover and explore amazing GitHub repositories</p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <RepositoryList />
        </div>
      
        <Pagination />
      </div>
    </div>
  );
}
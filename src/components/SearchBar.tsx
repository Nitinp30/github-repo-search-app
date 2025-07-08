import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { searchRepositories } from '../services/githubApi';
import { useDebounce } from '../hooks/useDebounce';

export function SearchBar() {
  const { state, dispatch } = useApp();
  const [inputValue, setInputValue] = useState(state.query);
  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== state.query) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_QUERY', payload: query });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
    dispatch({ type: 'SET_HAS_SEARCHED', payload: true });

    try {
      const data = await searchRepositories(query, 1);
      dispatch({ 
        type: 'SET_REPOSITORIES', 
        payload: { repositories: data.items, totalCount: data.total_count } 
      });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An error occurred while searching' 
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue);
    }
  };

  const clearSearch = () => {
    setInputValue('');
    dispatch({ type: 'SET_QUERY', payload: '' });
    dispatch({ type: 'SET_REPOSITORIES', payload: { repositories: [], totalCount: 0 } });
    dispatch({ type: 'SET_HAS_SEARCHED', payload: false });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search GitHub repositories..."
            className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
          />
          {inputValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {state.loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div role="status" className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </form>
    </div>
  );
}
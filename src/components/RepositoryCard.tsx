import { Star, GitFork, AlertCircle, ExternalLink } from "lucide-react";
import { Repository } from "../types";
import { Link } from "react-router-dom";
import { getLanguageColor } from "../utils/languageColors";
import { formatNumber } from "../utils/format";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <Link
                to={`/repository/${repository.owner.login}/${repository.name}`}
                className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors group-hover:text-blue-600"
              >
                {repository.name}
              </Link>
              <p className="text-gray-500 text-sm">{repository.owner.login}</p>
            </div>
          </div>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {repository.description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-gray-500">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatNumber(repository.stargazers_count)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <GitFork className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatNumber(repository.forks_count)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatNumber(repository.open_issues_count)}
              </span>
            </div>
          </div>
          {repository.language && (
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}
              ></div>
              <span className="text-sm text-gray-600">
                {repository.language}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

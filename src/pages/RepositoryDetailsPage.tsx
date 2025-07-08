import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  GitFork,
  AlertCircle,
  ExternalLink,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { Repository } from "../types";
import { getRepositoryDetails } from "../services/githubApi";
import { getLanguageColor } from "../utils/languageColors";
import { formatDate, formatNumber } from "../utils/format";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function RepositoryDetailsPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      if (!owner || !repo) return;

      try {
        setLoading(true);
        const data = await getRepositoryDetails(owner, repo);
        setRepository(data);
        console.log("Repository details:", data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load repository details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [owner, repo]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!repository) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                  className="w-16 h-16 rounded-full border-4 border-white/20"
                />
                <div>
                  <h1 className="text-3xl font-bold">{repository.name}</h1>
                  <p className="text-blue-100 text-lg">
                    {repository.owner.login}
                  </p>
                </div>
              </div>
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {repository.description ||
                    "No description available for this repository."}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(repository.stargazers_count)}
                    </div>
                    <div className="text-sm text-gray-600">Stars</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <GitFork className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(repository.forks_count)}
                    </div>
                    <div className="text-sm text-gray-600">Forks</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(repository.open_issues_count)}
                    </div>
                    <div className="text-sm text-gray-600">Issues</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-600">Contributors</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Repository Details
                </h3>
                <div className="space-y-4">
                  {repository.language && (
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${getLanguageColor(
                          repository.language,
                        )}`}
                      ></div>
                      <span className="text-gray-700">
                        {repository.language}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div className="text-sm">Created</div>
                      <div className="font-medium">
                        {formatDate(repository.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <div>
                      <div className="text-sm">Last updated</div>
                      <div className="font-medium">
                        {formatDate(repository.updated_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

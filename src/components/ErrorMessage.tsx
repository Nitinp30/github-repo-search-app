import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const ErrorMessage = ({ error }: { error: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Error Loading Repository
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Search</span>
      </Link>
    </div>
  </div>
);

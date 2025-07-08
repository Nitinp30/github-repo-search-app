export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="flex items-center justify-center py-12">
        <div className="text-center" role="status"> 
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  )
}

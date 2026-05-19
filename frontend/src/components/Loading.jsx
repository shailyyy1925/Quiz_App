const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-slate-600"></div>
          <p className="text-lg font-medium text-slate-700">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default Loading

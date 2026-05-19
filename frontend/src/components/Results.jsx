const Results = ({ results, onRestart, onBackToHome }) => {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600'
    if (percentage >= 60) return 'text-amber-600'
    return 'text-rose-600'
  }

  const getScoreBg = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-50 border-emerald-200'
    if (percentage >= 60) return 'bg-amber-50 border-amber-200'
    return 'bg-rose-50 border-rose-200'
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent work!'
    if (percentage >= 60) return 'Good job!'
    if (percentage >= 40) return 'Keep practicing!'
    return 'Don\'t give up!'
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToHome}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition flex items-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
              <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                {results.quiz_title}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className={`text-center p-8 rounded-xl border-2 mb-8 ${getScoreBg(results.percentage)}`}>
              <div className={`text-5xl font-bold mb-2 ${getScoreColor(results.percentage)}`}>
                {results.percentage}%
              </div>
              <p className="text-lg text-slate-700 mb-1">
                {results.score} out of {results.total} correct
              </p>
              <p className="text-slate-600 font-medium">
                {getScoreMessage(results.percentage)}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {results.results.map((result, index) => (
                <div
                  key={result.question_id}
                  className={`p-4 rounded-xl border-2 ${
                    result.is_correct
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-rose-200 bg-rose-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      result.is_correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed">{result.question}</p>
                  </div>
                  <div className="ml-9 space-y-1 text-sm">
                    <p className={result.is_correct ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                      Your answer: {result.user_answer !== null ? result.options[result.user_answer] : 'Not answered'}
                    </p>
                    {!result.is_correct && (
                      <p className="text-emerald-700 font-medium">
                        Correct answer: {result.options[result.correct_answer]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBackToHome}
                className="flex-1 px-6 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition font-medium"
              >
                Choose Another Quiz
              </button>
              <button
                onClick={onRestart}
                className="flex-1 px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results

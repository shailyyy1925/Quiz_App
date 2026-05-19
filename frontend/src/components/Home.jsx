import { useState, useEffect } from 'react'

const Home = ({ onSelectQuiz }) => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('All')

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes')
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes')
      }
      const data = await response.json()
      setQuizzes(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const genres = ['All', ...new Set(quizzes.map(q => q.genre))]

  const filteredQuizzes = selectedGenre === 'All' 
    ? quizzes 
    : quizzes.filter(q => q.genre === selectedGenre)

  const genreColors = {
    'General Knowledge': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'blue' },
    'Science': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', accent: 'green' },
    'History': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', accent: 'amber' },
    'Geography': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', accent: 'teal' },
    'Sports': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', accent: 'orange' },
    'Entertainment': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', accent: 'pink' },
    'Technology': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', accent: 'cyan' },
    'Literature': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', accent: 'indigo' },
    'Food': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', accent: 'red' },
    'Nature': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'emerald' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-slate-600"></div>
            <p className="text-lg font-medium text-slate-700">Loading quizzes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-3">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchQuizzes}
            className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">Quiz Hub</h1>
          <p className="text-slate-600 text-lg">Pick a topic and challenge yourself</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedGenre === genre
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => {
            const colors = genreColors[quiz.genre] || genreColors['General Knowledge']
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 cursor-pointer group"
                onClick={() => onSelectQuiz(quiz.id)}
              >
                <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-3 py-1 bg-white ${colors.text} rounded-full shadow-sm`}>
                      {quiz.genre}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      {quiz.question_count} questions
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{quiz.description}</p>
                </div>
                <div className="p-4 bg-white">
                  <button className={`w-full py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3`}>
                    <span>Start Quiz</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl text-slate-600 font-medium">No quizzes found in this category</p>
            <p className="text-slate-500 mt-2">Try selecting a different genre</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

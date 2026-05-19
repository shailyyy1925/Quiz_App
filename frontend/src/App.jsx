import { useState, useEffect } from 'react'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Loading from './components/Loading'

function App() {
  const [view, setView] = useState('home') // 'home', 'quiz', 'results'
  const [selectedQuizId, setSelectedQuizId] = useState(null)
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)

  const handleSelectQuiz = (quizId) => {
    setSelectedQuizId(quizId)
    setView('quiz')
    fetchQuizData(quizId)
  }

  const fetchQuizData = async (quizId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/quiz/${quizId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data')
      }
      const data = await response.json()
      setQuizData(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSubmitQuiz = async (answers) => {
    try {
      const response = await fetch(`/api/quiz/${selectedQuizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      if (!response.ok) {
        throw new Error('Failed to submit quiz')
      }
      const data = await response.json()
      setResults(data)
      setView('results')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRestart = () => {
    setView('quiz')
    setResults(null)
    fetchQuizData(selectedQuizId)
  }

  const handleBackToHome = () => {
    setView('home')
    setSelectedQuizId(null)
    setQuizData(null)
    setResults(null)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-3">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={handleBackToHome}
            className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {view === 'home' && <Home onSelectQuiz={handleSelectQuiz} />}
      {view === 'quiz' && (
        <Quiz
          quizData={quizData}
          onSubmit={handleSubmitQuiz}
          onBack={handleBackToHome}
        />
      )}
      {view === 'results' && (
        <Results
          results={results}
          onRestart={handleRestart}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  )
}

export default App

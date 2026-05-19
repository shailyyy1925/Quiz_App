import { useState } from 'react'

const Quiz = ({ quizData, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(answers)
  }

  const question = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition flex items-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                {quizData.genre}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{quizData.title}</h1>
            <p className="text-slate-600 text-sm">{quizData.description}</p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-600 mb-2 font-medium">
                <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-slate-800 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
                {question.question}
              </h2>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(question.id, index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      answers[question.id] === index
                        ? 'border-slate-800 bg-slate-50 text-slate-800 font-medium'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-200">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>

              {currentQuestion === quizData.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={answers[question.id] === undefined}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={answers[question.id] === undefined}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz

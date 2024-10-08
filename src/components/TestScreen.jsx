// TestScreen.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { questions } from '../data/questions'; // Questions with correct answers

const TestScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    if (!storedUser) {
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) setAnswers(JSON.parse(storedAnswers));
  }, []);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const resetTest = () => {
    setIsSubmitted(false);
    setShowSummary(false);
    setAnswers({});
    setCurrentQuestion(0);
    localStorage.removeItem('quizAnswers');
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  if (isSubmitted && !showSummary) {
    return (
      <div className="container mx-auto p-8">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <h2 className="text-3xl font-bold mb-8">Congratulations! 🎉</h2>
        <h3 className="text-2xl font-semibold mb-4">
          Your Score: {calculateScore()} / {questions.length}
        </h3>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setShowSummary(true)}
        >
          Show Summary
        </button>
        <button
          className="bg-gray-600 text-white px-6 py-2 ml-4 rounded-lg"
          onClick={resetTest}
        >
          Retake Test
        </button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Test Summary</h2>
        <ul className="mb-8">
          {questions.map((q) => (
            <li key={q.id} className="mb-4">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">{q.question}</h4>
                <p
                  className={`text-sm ${
                    answers[q.id] === q.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  Your Answer: {answers[q.id] ? answers[q.id] : 'Not Answered'}
                </p>
                {answers[q.id] !== q.correctAnswer && (
                  <p className="text-sm text-blue-600">
                    Correct Answer: {q.correctAnswer}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-lg"
          onClick={resetTest}
        >
          Retake Test
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <div className="grid grid-cols-3 gap-4">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
                currentQuestion === index
                  ? 'bg-yellow-500 text-white'
                  : answers[index + 1]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } hover:bg-blue-500 hover:text-white`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6">
            Question {currentQuestion + 1}:{' '}
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestion].id}`}
                  value={option}
                  onChange={() =>
                    handleAnswerChange(questions[currentQuestion].id, option)
                  }
                  checked={answers[questions[currentQuestion].id] === option}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-lg">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-600 text-white px-6 py-2 rounded-lg"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
          {currentQuestion === questions.length - 1 && (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScreen;

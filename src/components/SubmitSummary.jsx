import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SubmitSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions } = location.state;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Submit Summary</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id} className="mb-2">
            <p>{question.question}</p>
            <p>
              Answer:{' '}
              {answers[question.id] ? answers[question.id] : 'Not Answered'}
            </p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/test')}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Back to Test
      </button>
    </div>
  );
};

export default SubmitSummary;

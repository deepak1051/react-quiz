import React, { useState } from 'react';

const questionsData = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  // Add more questions here
];

const QuestionDisplay = ({
  currentQuestion,
  handleAnswer,
  handleNavigation,
}) => {
  const { question, options } = currentQuestion;

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      {options.map((option, index) => (
        <div key={index}>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={`question_${currentQuestion.id}`}
              onChange={() => handleAnswer(currentQuestion.id, option)}
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
      <div className="mt-4">
        <button
          onClick={() => handleNavigation('prev')}
          className="bg-gray-300 px-4 py-2 mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;

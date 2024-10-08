import React from 'react';

const QuestionLegend = ({
  questions,
  currentQuestionId,
  handleJumpToQuestion,
}) => {
  return (
    <div className="flex justify-around mt-4">
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => handleJumpToQuestion(q.id)}
          className={`w-10 h-10 ${
            currentQuestionId === q.id ? 'bg-green-500' : 'bg-gray-200'
          } text-white rounded-full`}
        >
          {q.id}
        </button>
      ))}
    </div>
  );
};

export default QuestionLegend;

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">
        Welcome to the Quiz Application!
      </h2>
      <p className="mb-4">
        This application allows you to test your knowledge with various quizzes
        on different topics.
      </p>
      <h3 className="text-2xl font-semibold mb-2">How to Use:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Click on Login to create a user account.</li>
        <li>Once logged in, you can access the quiz by clicking Test</li>
        <li>Answer all questions and submit your answers to see your score.</li>
        <li>Check your answers and review your performance in the summary.</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-2">Features:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>User authentication to save your progress.</li>
        <li>Real-time feedback on your answers.</li>
        <li>
          Interactive user interface with a fun confetti effect upon submission.
        </li>
      </ul>
      <p className="mb-4">Get started now and challenge yourself!</p>
    </div>
  );
};

export default Home;

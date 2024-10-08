import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('quizUser'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizAnswers');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        Quiz Application
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/test" className="hover:text-blue-400">
              Test
            </Link>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout} className="hover:text-blue-400">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      {user && <span className="ml-4">{`Welcome, ${user.name}`}</span>}
    </header>
  );
};

export default Header;

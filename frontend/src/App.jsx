import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TutorialPage from './pages/TutorialPage';

// Simple Home Page
const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-4xl font-bold mb-8 text-blue-700">MAC Solutions</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['tut1', 'tut2', 'tut3', 'tut4', 'tut5'].map(id => (
        <Link 
          key={id} 
          to={`/tutorial/${id}`}
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center font-semibold text-gray-700 hover:text-blue-600"
        >
          Open {id.toUpperCase()}
        </Link>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial/:id" element={<TutorialPage />} />
      </Routes>
    </Router>
  );
}

export default App;

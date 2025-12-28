import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SolutionCard from '../components/SolutionCard';

const TutorialPage = () => {
  const { id } = useParams(); // Gets 'tut1' from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from FastAPI backend
    const TutorialPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use environment variable for API URL, fallback to localhost for dev
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    axios.get(`${API_URL}/api/tutorial/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tutorial:", err);
        setLoading(false);
      });
  }, [id]);
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching tutorial:", err));
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Solutions...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Home</Link>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-gray-600 mt-2">{data.description}</p>
        </header>

        {data.sections.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {section.section_title}
            </h2>
            {section.problems.map(prob => (
              <SolutionCard key={prob.id} problem={prob} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialPage;

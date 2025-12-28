import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SolutionCard from '../components/SolutionCard';
import { ArrowLeft, Loader2 } from 'lucide-react';

const TutorialPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic URL: Uses environment variable in Production, localhost in Dev
  // REPLACE THE URL BELOW WITH YOUR EXACT RENDER URL
const API_URL = "https://mac-solutions-api.onrender.com";

  useEffect(() => {
    setLoading(true);
    // Make sure the backticks (`) are used here, not single quotes (')
    axios.get(`${API_URL}/api/tutorial/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tutorial:", err);
        setError("Failed to load solutions. Please check if the backend is running.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-blue-600">
      <Loader2 className="animate-spin mr-2" /> Loading Solutions...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
        </Link>
        
        <header className="mb-10 text-center sm:text-left bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{data.title}</h1>
          <p className="text-lg text-gray-500 mt-3">{data.description}</p>
        </header>

        <div className="space-y-12">
          {data.sections.map((section, idx) => (
            <div key={idx} id={`section-${idx}`}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.section_title}
                </h2>
                <div className="h-px bg-gray-200 flex-grow"></div>
              </div>
              
              <div className="grid gap-6">
                {section.problems.map(prob => (
                  <SolutionCard key={prob.id} problem={prob} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;

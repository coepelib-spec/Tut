import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Eye } from 'lucide-react'; // Icon for visualization

const SolutionCard = ({ problem }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <span className="font-bold text-blue-600 text-lg">Q{problem.id}</span>
        <span className="text-xs text-gray-400 uppercase tracking-wider">{problem.source_ref}</span>
      </div>

      {/* Main Question */}
      <div className="mb-4 text-gray-800 text-lg">
        {problem.question_latex ? <BlockMath math={problem.question_latex} /> : <p>{problem.question_text}</p>}
      </div>

      {/* Visualization Trigger (New Feature) */}
      {problem.visualization_type && (
        <div className="mb-4 p-3 bg-purple-50 text-purple-700 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-purple-100">
          <Eye size={18} />
          <span className="text-sm font-medium">View Visualization ({problem.visualization_type})</span>
        </div>
      )}

      {/* Main Solution */}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Solution</h4>
        
        {problem.solution_latex && <div className="mb-3"><BlockMath math={problem.solution_latex} /></div>}
        
        {problem.solution_steps && (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {problem.solution_steps.map((step, idx) => (
              <li key={idx}>
                {step.split('$').map((part, i) => i % 2 === 1 ? <InlineMath math={part} key={i}/> : part)}
              </li>
            ))}
          </ul>
        )}

        {/* Sub-Questions Loop */}
        {problem.sub_questions && (
          <div className="mt-6 border-t pt-4">
            {problem.sub_questions.map((sub, idx) => (
              <div key={idx} className="mb-4">
                <span className="font-semibold text-gray-700 italic block mb-1">{sub.label}:</span>
                <div className="pl-4 border-l-2 border-blue-200">
                  <BlockMath math={sub.solution_latex} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionCard;

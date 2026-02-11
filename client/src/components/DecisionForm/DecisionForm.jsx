import { useState } from 'react';
import './DecisionForm.css';

export default function DecisionForm({ onSubmit, isLoading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form className="decision-form" onSubmit={handleSubmit}>
      <textarea
        className="question-input"
        placeholder="Ask the Gemini Decision Ball anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={isLoading}
        rows={3}
      />
      <button
        type="submit"
        className="submit-button"
        disabled={!question.trim() || isLoading}
      >
        {isLoading ? 'Seeking wisdom...' : 'Shake the Ball'}
      </button>
    </form>
  );
}

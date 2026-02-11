import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDecisions } from '../context/DecisionContext';
import EightBall from '../components/EightBall/EightBall';
import ModeSelector from '../components/ModeSelector/ModeSelector';
import DecisionForm from '../components/DecisionForm/DecisionForm';
import History from '../components/History/History';
import Auth from '../components/Auth/Auth';
import './HomePage.css';

export default function HomePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentDecision, loading, askQuestion } = useDecisions();
  const [selectedMode, setSelectedMode] = useState('normal');
  const [isShaking, setIsShaking] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setIsShaking(true);
    try {
      await askQuestion(question, selectedMode);
      setTimeout(() => setIsShaking(false), 800);
    } catch (err) {
      setIsShaking(false);
      console.error('Error getting decision:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="background-gradient"></div>

      <Auth onHistoryClick={() => setIsHistoryOpen(true)} />

      <div className="content">
        <div className="header">
          <h1>🔮 Gemini Decision Ball</h1>
          <p>Seek cosmic wisdom, absurd chaos, or shakespearean drama</p>
        </div>

        {!isAuthenticated ? (
          <div className="auth-required">
            <div className="auth-card">
              <h2>Welcome to Gemini Decision Ball</h2>
              <p>Sign in with Google to ask the mystical orb for decisions</p>
              <button className="auth-redirect" onClick={() => window.location.href = '/api/auth/google'}>
                🔐 Login with Google
              </button>
            </div>
          </div>
        ) : (
          <>
            <ModeSelector
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              disabled={loading}
            />

            <DecisionForm onSubmit={handleQuestionSubmit} isLoading={loading} />

            <EightBall
              isShaking={isShaking}
              answer={currentDecision?.answer}
              isAnswering={loading}
            />

            <History isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}

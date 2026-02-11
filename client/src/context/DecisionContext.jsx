import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const DecisionContext = createContext();

export const DecisionProvider = ({ children }) => {
  const [currentDecision, setCurrentDecision] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askQuestion = async (question, mode = 'normal') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/decisions', { question, mode });
      setCurrentDecision(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to get decision';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (page = 1, limit = 20, mode = null) => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (mode) params.mode = mode;
      const response = await api.get('/history', { params });
      setHistory(response.data.decisions);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const deleteDecision = async (id) => {
    try {
      await api.delete(`/history/${id}`);
      setHistory(history.filter((d) => d.id !== id));
    } catch (err) {
      console.error('Failed to delete decision:', err);
      setError('Failed to delete decision');
    }
  };

  const clearHistory = async () => {
    try {
      await api.delete('/history');
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
      setError('Failed to clear history');
    }
  };

  return (
    <DecisionContext.Provider
      value={{
        currentDecision,
        setCurrentDecision,
        history,
        setHistory,
        loading,
        error,
        askQuestion,
        fetchHistory,
        deleteDecision,
        clearHistory,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecisions = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error('useDecisions must be used within DecisionProvider');
  }
  return context;
};

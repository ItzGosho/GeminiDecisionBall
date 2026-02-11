import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDecisions } from '../../context/DecisionContext';
import './History.css';

export default function History({ isOpen, onClose }) {
  const { history, fetchHistory, deleteDecision, clearHistory } = useDecisions();
  const [modeFilter, setModeFilter] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isOpen) {
      fetchHistory(page, 20, modeFilter);
    }
  }, [isOpen, page, modeFilter]);

  const modes = ['normal', 'crazy', 'bombastic'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="history-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="history-panel"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="history-header">
              <h2>Decision History</h2>
              <button className="close-button" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="history-filters">
              <button
                className={`filter-button ${modeFilter === null ? 'active' : ''}`}
                onClick={() => setModeFilter(null)}
              >
                All
              </button>
              {modes.map((mode) => (
                <button
                  key={mode}
                  className={`filter-button ${modeFilter === mode ? 'active' : ''}`}
                  onClick={() => {
                    setModeFilter(mode);
                    setPage(1);
                  }}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="history-list">
              {history.length === 0 ? (
                <p className="no-history">No decisions yet. Ask the ball a question!</p>
              ) : (
                history.map((decision, idx) => (
                  <motion.div
                    key={decision.id}
                    className="history-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="history-content">
                      <div className="history-mode">{decision.mode}</div>
                      <p className="history-question">
                        <strong>Q:</strong> {decision.question}
                      </p>
                      <p className="history-answer">
                        <strong>A:</strong> {decision.answer}
                      </p>
                      <span className="history-date">
                        {new Date(decision.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => deleteDecision(decision.id)}
                      title="Delete this decision"
                    >
                      🗑️
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="history-actions">
                <button className="clear-button" onClick={clearHistory}>
                  Clear All History
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

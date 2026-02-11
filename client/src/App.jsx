import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DecisionProvider } from './context/DecisionContext';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DecisionProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Routes>
        </DecisionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

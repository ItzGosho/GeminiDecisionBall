import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Auth({ onHistoryClick }) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="auth-container">
      {isAuthenticated && user ? (
        <div className="user-info">
          {user.avatar && <img src={user.avatar} alt={user.name} className="user-avatar" />}
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
          <div className="auth-buttons">
            <button className="history-button" onClick={onHistoryClick} title="View decision history">
              📚
            </button>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          🔐 Login with Google
        </button>
      )}
    </div>
  );
}

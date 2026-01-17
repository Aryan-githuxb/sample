import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Logic: If user is null (not logged in), kick them back to login
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="dashboard-container">
      {/* Navbar Area */}
      <nav className="navbar">
        <span>Welcome, <strong>{user.username}</strong></span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </nav>

      {/* Main Center Content */}
      <div className="center-content">
        <h1>SIGNED IN</h1>
      </div>
    </div>
  );
};

export default Dashboard;
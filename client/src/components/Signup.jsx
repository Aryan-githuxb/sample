import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Data Flow: 
      // 1. Frontend gathers data (username, password)
      // 2. Axios sends it to Backend (server/routes/auth.js)
      // 3. Backend hashes password and saves to MongoDB
      await axios.post('http://localhost:5000/auth/signup', { 
        username, 
        password 
      });

      alert('Signup Successful! Please Login.');
      
      // Logic: After successful signup, move user to Login page
      navigate('/login');
    } catch (err) {
      // Logic: If username exists or server fails
      console.error(err);
      alert('Error signing up (Username might be taken)');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
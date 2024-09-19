import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUpPage.css';


const SignUpPage = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(false); // Switch between SignUp and Login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      alert('User registered successfully!');
      console.log(response)
    } catch (error) {
      console.error('Error response from server:', error.response);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      alert(`Signup failed: ${errorMessage}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Save the JWT token and user data to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ name: response.data.name, role: response.data.role }));

      // Update the state in the parent component (Navbar)
      setUser({ name: response.data.name, role: response.data.role });

      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error.response);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      alert(`Login failed: ${errorMessage}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Reset the user state
  };

  // If the user is logged in, show the user's role and logout button
  if (user) {
    return (
      <div className="auth-page">
        <h1>Welcome, {user.name}</h1>
        <p>Your role: {user.role}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // Otherwise, show the signup/login forms
  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>
          Sign Up
        </button>
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
          Login
        </button>
      </div>

      {isLogin ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;

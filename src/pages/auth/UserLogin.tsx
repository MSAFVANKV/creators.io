import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { makeToast, makeToastError } from '@/lib/toasters';
import { useAuth } from '@/context/AuthContext';

const UserLogin: React.FC = () => {
  const { isAuthenticated, isLoading,setIsAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while authentication is being checked
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const [username, setUsername] = useState('safvan');
  const [password, setPassword] = useState('12345');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { username, password }, { withCredentials: true });
      if (response.status === 201) {
        makeToast('Login successful');
        setIsAuthenticated(true);
        navigate('/'); // Navigate to home page on successful login
      }
    } catch (error) {
      console.error(error);
      makeToastError('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;

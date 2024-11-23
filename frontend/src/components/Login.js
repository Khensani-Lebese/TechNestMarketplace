import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser(credentials));
  
    if (response.meta.requestStatus === 'fulfilled') {
      // Set isAuthenticated and user based on response
      const userRole = response.payload.role;
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'user') {
        navigate('/user');
      }
    } else {
      console.error('Login failed:', response.error?.message);
    }
  };

  // Effect to handle navigation based on authentication and user role
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on user role after successful authentication
      if (user) {
        switch (user.role) {
          case 'admin':
            navigate('/admin'); // Redirect to AdminPanel
            break;
          case 'user':
            navigate('/user'); // Redirect to UserPanel
            break;
          default:
            navigate('/'); // Redirect to home if role is not recognized
            break;
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>Login</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default Login;

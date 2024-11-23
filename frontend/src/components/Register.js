// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userActions'; // Import the registerUser action

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default role
    specialCode: '', // Code for admin registration
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
      specialCode: e.target.value === 'Admin' ? formData.specialCode : '', // Clear special code if not admin
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate admin special code
    if (formData.role === 'admin' && formData.specialCode !== 'codetribeAdmin123@MLAB') {
      setError('Invalid special code for admin registration.');
      return;
    }

    try {
      dispatch(registerUser(formData)); // Dispatch the registerUser action
      setSuccessMessage('Registration successful! You can now log in.');
      setFormData({ email: '', password: '',role: 'admin', specialCode: '' }); // Reset form
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
  
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        
        <div>
          <label htmlFor="role">Role:</label>
          <select name="role" value={formData.role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {formData.role === 'admin' && (
          <input
            type="text"
            name="specialCode"
            value={formData.specialCode}
            onChange={handleChange}
            placeholder="Admin Special Code"
            required
          />
        )}

        <button type="submit">Register</button>
      </form>
      {typeof error === 'string' && error && <p style={{ color: 'red' }}>{error}</p>}
{typeof successMessage === 'string' && successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Register;

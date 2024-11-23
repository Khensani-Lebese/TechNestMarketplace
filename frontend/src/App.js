import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/HomePage';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserPanel />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

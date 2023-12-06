import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/home'; // Adjust the import path as necessary
import LoginForm from './components/auth/LoginPage'; // Adjust the import path as necessary
import Header from './components/header/header'; // Adjust the import path as necessary
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './components/auth/UserContext';
import EditProfile from './components/myProfile/EditProfile';

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </UserContext.Provider>
  );
};

export default App;
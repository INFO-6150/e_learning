import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png'; // Update with the path to your logo image
import RegisterForm from '../auth/RegisterForm';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ height: '30px' }} />
          NestKnowledge
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              {/* Trigger for Register Modal */}
              <RegisterForm />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;


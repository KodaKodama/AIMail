import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">AIMail</Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776; {/* Hamburger Icon */}
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
                <li><Link to="/login" className="login-btn" onClick={toggleMenu}>Login / Sign Up</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

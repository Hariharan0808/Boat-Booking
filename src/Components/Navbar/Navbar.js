import React from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isLogged = useSelector(state => state.auth.isLogged);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <nav className="navbar-container">
            <div style={{ display: 'flex' , cursor:'pointer' }} onClick={handleClick}>
                <img src="./img/logoIcon.jpg" alt="Logo" height={100} width={100} style={{ paddingTop: '0px', paddingLeft: '0px' }} />
                <h2 className="boat-themed-heading">BoBook</h2>
            </div>
            <ul className="navbar-ul">
                <li>
                    <Link to="/" className="navbar-link" style={{ textDecoration: 'none' }}>Home</Link>
                </li>
                <li>
                    <Link to="/bookings" className="navbar-link" style={{ textDecoration: 'none' }}>Bookings</Link>
                </li>
                {isLogged ? (
                    <li><Link to="/profile" className="navbar-link" style={{ textDecoration: 'none' }}><img src="/img/user.png" alt="Profile" style={{ width: '30px', height: '30px' }} /></Link></li>
                ) : (
                    <li><Link to="/login" className="navbar-link" style={{ textDecoration: 'none' }}>Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

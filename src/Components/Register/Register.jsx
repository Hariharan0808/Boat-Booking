import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

const Register = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData)).then(() => {
      navigate('/login');
    });
  };

  return (
    <div style={styles.container}>
      <center>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h1 style={{ fontFamily: 'sans-serif' }}>Register</h1>
          <label style={styles.label}>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{ ...styles.input, textAlign: 'center' }}
              placeholder="Email"
            />
          </label>
          <br />
          <label style={styles.label}>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              style={{ ...styles.input, textAlign: 'center' }}
              placeholder="Password"
            />
          </label>
          <br />
          <button type="submit" style={styles.button} onClick={handleSubmit}>
            Register
          </button>
          <br />
          {error && <span style={styles.error}>{error}</span>}
        </form>
      </center>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '160px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '##rgba(255, 255, 255, 0.347);', // Light blue background
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '350px',
    padding: '20px',
    border: '1px solid #00796b', // Teal border
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 8px 16px 0px, rgba(0, 0, 0, 0.1) 0px 4px 8px 0px',
  },
  label: {
    marginBottom: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00796b', // Teal color
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #00796b', // Teal border
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#00796b', // Teal background
    color: '#ffffff',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#004d40', // Darker teal for hover
  },
  error: {
    color: '#d32f2f', // Red color for error
    fontSize: '14px',
    marginTop: '10px',
  },
  registerLink: {
    marginTop: '20px',
    fontSize: '16px',
  },
  link: {
    color: '#00796b', // Teal color
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};


export default Register;

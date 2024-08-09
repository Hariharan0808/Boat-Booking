import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);
  const isLogged = useSelector(state => state.auth.isLogged);

  console.log('Component isLogged:', isLogged); // Add this line

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return (
    <div style={styles.container}>
      <center>
        <form style={styles.form} onSubmit={handleLogin}>
          <center>
            <h1 style={{ fontFamily: 'sans-serif' }}>Login</h1>
          </center>
          <label style={styles.label}>
            <input
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              style={{ ...styles.input, textAlign: 'center' }}
              placeholder="Password"
            />
          </label>
          <br />
          <button type="submit" style={styles.button}>
            Login
          </button>
          <br />
          {error && <span style={styles.error}>{error}</span>}
          <p style={styles.registerLink}>
            Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
          </p>
        </form>
      </center>
    </div>
  );
};


const styles = {
  container: {
    paddingTop: '130px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'backgroundColor: #rgba(255, 255, 255, 0.347)', // Light blue background
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

export default Login;

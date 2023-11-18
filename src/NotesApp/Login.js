import React, { useState } from 'react';
import './Forumstyle.css';
import { TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = () => {
    axios.post('http://hyeumine.com/forumLogin.php', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(response => {
      if (!(response.status === 200 && response.statusText === "OK")) {
        throw new Error('Network response was not ok');
      }
      return response.data.user;
    })
    .then(user => {
      if (user) {
        setAlertMessage('Login successful');
        setUser(user);
      } else {
        setAlertMessage('Invalid login');
      }
      setAlertOpen(true);
      console.log(user);
    })
    .catch(error => {
      setAlertMessage('Login failed. Please check your credentials.');
      setAlertOpen(true);
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  return (
    <div className="background-image-container">
      <div className="innersudlanan">
        <div className="brand">Sign In</div>
        <div className="form-container">
          <div className="half-width">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="half-width">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </div>
          <div className="acc">Don't have an Account?</div>
          <div className="half-width">
            <Button
              variant="contained"
              color="success"
              fullWidth
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </div>
  );
};

export default Login;

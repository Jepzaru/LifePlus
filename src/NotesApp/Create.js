import React, { useState } from 'react';
import './Forumstyle.css';
import { TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';

const Create = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCreate = () => {

    // Use the state values for username and password
    axios.post(`http://hyeumine.com/forumCreateUser.php`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      if (response.status === 200 && response.statusText === "OK") {
        setAlertMessage('Account created successfully!');
      } else {
        throw new Error('Network response was not ok');
      }
      return response.data;
    })
    .then(user => {
        setAlertOpen(true);
      setUser(user);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      setAlertMessage('Account creation failed.');
    })
  };
  
  return (
    <div className="background-image-container">
      <div className="innersudlanan">
        <div className="brand">Create Account</div>
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
              onClick={handleCreate}
            >
              Sign Up
            </Button>
          </div>
          <div className="acc">Already have an account?</div>
          <div className="half-width">
            <Button
              variant="contained"
              color="success"
              fullWidth
            >
             Sign In
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

export default Create;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../ForumStyle/Loader.css';
import '../ForumStyle/ForumCreateAccount.css';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';

function ForumCreateAccount() {
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleCreateAccount = () => {
    setIsLoading(true);

    // Use the state values for username and password
    axios.post(`http://localhost:8080/user/insert`, {
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
      setUser(user);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      setAlertMessage('Account creation failed.');
    })
    .finally(() => {
      setIsLoading(false); 
    });
  };

  // Function to update the username state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to update the password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Determine if the button should be disabled
  const isButtonDisabled = username === '' || password === '' || isLoading;

  return (
    <div className="container">
      <div className="inner-container">
        <div className="image-container">
        </div>
        <div className="create">
          <div className="signUp">
            <h1>Create Account</h1>
            <div className="usernamefield">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input-field"
                id="uname"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="passwordfield">
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                className="input-field"
                id="pword"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="signUpButton">
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <button onClick={handleCreateAccount} disabled={isButtonDisabled}>
                  Sign Up
                </button>
              )}
              {alertMessage && <div className="alert-message"><span style={{ color: 'green' }}>{alertMessage}</span></div>}
            </div>
            <div className="text">
              <p>Already have an account?</p>
            </div>
            <div className="In">
              <Link to="/forum-login">
                <button>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumCreateAccount;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../ForumStyle/ForumLogIn.css';
import '../ForumStyle/Loader.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForumPage from './ForumPage';

function ForumLogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);

    axios
      .post('http://hyeumine.com/forumLogin.php', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.statusText === 'OK') {
          return response.data.user;
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((us) => {
        setIsLoading(false);
        console.log(us);
        setUser(us);

        if (us) {
          alert('Login Successful');
          setLoggedIn(true);
          setUserId(us.id);
          setUsername(us.username); 
        } else {
          alert('Invalid Login');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setIsLoading(false);
        alert('Invalid Login');
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isSignInDisabled = !username || !password || isLoading;

  return (
    <div className="container">
      {loggedIn ? (
        <ForumPage userId={userId} username={username} />
      ) : (
        <div className="inner-container">
          <div className="image"></div>
          <div className="login">
            <div className="signIn">
              <h1>Sign In</h1>
              <div className="usernamefield">
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className="input-field"
                  id="nuname"
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
                  id="npword"
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
              <div className="signbutton">
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  <button variant="contained" onClick={handleSignIn} disabled={isSignInDisabled}>
                    Sign In
                  </button>
                )}
                <div className="textstyle">
                  <p>Don't have an account?</p>
                </div>
                <div className="signup">
                  <Link to="/forum-createaccount" className="sign-up-button">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForumLogIn;
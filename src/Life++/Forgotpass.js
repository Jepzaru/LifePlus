import React, { useState } from 'react';
import '../LifeCss/Forgotpass.css';
import HashLoader from 'react-spinners/HashLoader';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('usernameOrEmail', usernameOrEmail);
      formData.append('newPassword', password);

      // Ask for confirmation before updating the password
      const confirmation = window.confirm('Are you sure you want to update your password?');

      if (!confirmation) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/user/forgotPassword',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Password update successful:', response.data);

      // Show alert for successful password update
      window.alert('Password updated successfully');

      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login-page');
      }, 3000);
    } catch (error) {
      console.error('Password update failed:', error.response?.data || error.message);

      // Show alert for password update failure
      window.alert('Password update failed');

      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/login-page');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="forimg">
      {loading ? (
        <HashLoader size={100} color={'white'} loading={loading} />
      ) : (
        <div className="forcon">
          <p>Forget Password</p>
          <div className='forgotfields'>
            <TextField
              label='Username or Email'
              variant='standard'
              fullWidth
              style={{ marginBottom: '20px', width: '80%', marginLeft: '50px' }}
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              fullWidth
              style={{ marginBottom: '1rem', width: '80%', marginLeft: '50px' }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='acsfp'>
            <div className='conf'>
              <button onClick={handleForgetPassword} className='confirmb'>
                Confirm
              </button>
              <p className="backcanc-link" onClick={handleBack}>
                Back
              </p>
            </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity="success"
              >
                {loading ? 'Updating password...' : 'Password updated successfully'}
              </MuiAlert>
            </Snackbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPasswordPage;

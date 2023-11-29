import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LifeCss/login.css';
import HashLoader from 'react-spinners/HashLoader';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../Life++/AuthContext';


const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        setLoading(true);
        // Fetch all users from your API using Axios
        axios.get('http://localhost:8080/user/get') // Replace with your API endpoint
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching users');
                setLoading(false);
            });
    }, []);

    const handleLogin = () => {
      setLoading(true);
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        console.log(foundUser);
        login(foundUser);
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        const dashboardPath = foundUser.type === 1 ? '/coach-index/dashboard' : '/index/dashboard';
        navigate(dashboardPath);

      } else {
        setError('Invalid username or password');
        setSnackbarOpen(true);
        setLoading(false);
      }
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
  
    return (
        <div className="logimg">
            {loading ? (
                <HashLoader size={100} color={'white'} loading={loading} />
            ) : (
                <div className="logcon">
                    <p>Log In</p>
                    <div className='fields'>
                        <TextField
                            label='Username'
                            variant='standard'
                            fullWidth
                            style={{ marginBottom: '20px', width: '63%', marginLeft: '30px' }}
                            InputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="standard"
                            fullWidth
                            style={{ marginBottom: '1rem', width: '63%', marginLeft: '30px' }}
                            InputProps={{
                            style: { fontFamily: 'Poppins, sans-serif' },
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='forgot'>
                        <Link to='/forgot-password'>
                            Forget Password
                        </Link>
                    </div>
                    <div className='acs'>
                        <div className='log'>
                            <button onClick={handleLogin} className='login-enter'>
                                Sign In
                            </button>
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
                severity="error"
              >
                Invalid username or password
              </MuiAlert>
            </Snackbar>
                        <p>Don't have an account yet?</p>
                        <Link to='/sign-up' className='create-enter'>
                            Create Account
                        </Link>
                    </div>
                    <div className='rope'></div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
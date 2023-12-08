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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgetPassword = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/user/forgotPassword',
                {

                    username: username,
                    email: email,
                    newPassword: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Password update successful:', response.data);
            setSnackbarOpen(true);
            navigate('/login-page');
        } catch (error) {
            console.error('Password update failed:', error.response?.data || error.message);
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
                            label='Username'
                            variant='standard'
                            fullWidth
                            style={{ marginBottom: '20px', width: '80%', marginLeft: '50px' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label='Email'
                            variant='standard'
                            fullWidth
                            style={{ marginBottom: '20px', width: '80%', marginLeft: '50px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className='acsf'>
                        <div className='conf'>
                            <button onClick={handleForgetPassword} className='confirmb'>
                                Confirm
                            </button>
                            <p className="backcan-link" onClick={handleBack}>
                                Cancel
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

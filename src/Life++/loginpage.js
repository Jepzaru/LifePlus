import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LifeCss/login.css';
import HashLoader from 'react-spinners/HashLoader';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            navigate('/index/dashboard'); // Replace '/landingpage' with your desired route
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
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
                            label='Password'
                            type='password'
                            variant='standard'
                            fullWidth
                            style={{ marginBottom: '1rem', width: '63%', marginLeft: '30px' }}
                            InputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
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
                        <p>{error}</p>
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
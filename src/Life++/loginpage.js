import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../LifeCss/login.css';
import HashLoader from 'react-spinners/HashLoader'
import TextField from '@mui/material/TextField';

const LoginPage = () => {
    const [loading ,setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setTimeout(() =>{
          setLoading(false)
        }, 2000)
      }, [])

  return (
    <div className="logimg">
         { loading ? 
      <HashLoader
      size={100}
      color={"white"}
      loading={loading} />
      :
        <div className="logcon">
            <p>Log In</p>
            <div className='fields'>
            <TextField
          label="Username"
          variant="standard"
          fullWidth
          style={{ marginBottom: '20px', width: '63%', marginLeft: '30px' }} InputProps={{ style: { fontFamily: 'Poppins,sans-serif' } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          style={{ marginBottom: '1rem', width: '63%', marginLeft: '30px' }} InputProps={{ style: { fontFamily: 'Poppins,sans-serif' } }}
        />
        </div>
        <div className='forgot'>
        <Link to="/forgot-password">
            Forget Password
          </Link>
        </div>
        <div className='acs'>
          <div className='log'>
            <Link to="/sign-up" className='login-enter'>Sign In</Link>
            </div>
            <p>Don't have an account yet?</p>
            <Link to="/sign-up" className='create-enter'>Create Account</Link>
           
        </div>

        <div className='rope'>
        </div>
        </div>
}
    </div>

  );
};

export default LoginPage
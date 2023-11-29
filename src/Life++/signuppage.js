import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../LifeCss/signup.css';
import HashLoader from 'react-spinners/HashLoader'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const StyledDatePicker = styled(DatePicker)({
    width: '155px',
    marginLeft: '30px',
  });
  

export default function SignUpPage() {
   
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState('');
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        emailaddress: '',
        birthdate: '',
        pnum: '',
        gender: '',
        username: '',
        password: '',
        showPassword: false,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        }, 2000)
    }, [])

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const isPasswordValid = () => {
        const { password, confirmPassword } = formData;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return (
          password === confirmPassword &&
          password.match(passwordRegex) !== null
        );
      };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

      const handleSuccessSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSuccessSnackbarOpen(false);
      };
    

      const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleCreateAccount = () => {

    const requiredFields = ['fname', 'lname', 'email', 'birthdate', 'pnum', 'gender', 'username', 'password', 'confirmPassword'];
    const isAnyFieldEmpty = requiredFields.some(field => !formData[field]);

    if (isAnyFieldEmpty) {
      // Show error Snackbar for empty fields
      setSnackbarOpen(true);
      return;
    }

        if (!isPasswordValid()) {
            // Password does not meet criteria, handle accordingly
            console.error('Password does not meet the criteria');
            setSnackbarOpen(true);
            return;
          }
        // Prepare the data to be sent in the POST request
        const postData = {
            ...formData,
            accountType: accountType === 'Coach' ? 1 : 0,
        };

        // Send a POST request using Axios
        axios.post('http://localhost:8080/user/insert', postData, {
    headers: {
        'Content-Type': 'application/json',
    },
})
            .then((response) => {
                // Handle the response, e.g., show a success message
                console.log('Account created successfully:', response.data);
                setSuccessSnackbarOpen(true);
            })
            .catch((error) => {
                // Handle errors, e.g., show an error message
                console.error('Error creating account:', error);
            });
    };


    return (
        <div className="signupimg">
            {loading ? (
                <HashLoader size={100} color={"white"} loading={loading} />
            ) : (
                <div className="signupcon">
                    <p>Create Account</p>
                    <div className='hipi'></div>
                    <div className='fieldsign'>
                        <TextField
                            label="First name"
                            name="fname"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }}  InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Last name"
                            name="lname"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }} InputProps={{ style: { fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }} InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatePicker
                        selected={formData.birthdate}
                        name="birthdate"
                        onChange={(date) => setFormData({ ...formData, birthdate: date })}
                        dateFormat="MM/dd/yyyy"
                    
                        />
                        </LocalizationProvider>
                        <TextField
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            name="pnum"
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }} InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            name="gender"
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '15%', marginLeft: '30px' }} InputProps={{ style: { fontFamily: 'Poppins,sans-serif' } }}
                        />
                    </div>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        onChange={handleInputChange}
                        style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }} InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                    />
                     <TextField
                        label="Password"
                        type={formData.showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        name="password"
                        onChange={handleInputChange}
                        style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }}
                        InputProps={{
                        style: { fontFamily: 'Poppins,sans-serif' },
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                         <TextField
                        label="Confirm Password"
                        type={formData.showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        name="confirmPassword"
                        onChange={handleInputChange}
                        style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }}
                        InputProps={{
                        style: { fontFamily: 'Poppins,sans-serif' },
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                         <FormControl style={{ marginBottom: '20px', width: '15%', marginLeft: '30px' }} >
                        <InputLabel id="account-type">Account</InputLabel>
                        <Select
                            labelId="account-type-label"
                            id="account-type"
                            value={accountType}
                            onChange={handleAccountTypeChange}
                            displayEmpty
                            label= "Account"
                            inputProps={{ name: 'accountType', id: 'account-type' }}
                        >
                            <MenuItem value="Coach">Coach</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </Select>
                    </FormControl>
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
                        Password does not meet the criteria.
                        </MuiAlert>
                    </Snackbar>
                    <Snackbar
                        open={successSnackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSuccessSnackbarClose}
                    >
                        <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleSuccessSnackbarClose}
                        severity="success"
                        >
                        Account created successfully!
                        </MuiAlert>
                    </Snackbar>
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
                        All fields must be filled.
                        </MuiAlert>
                    </Snackbar>
                    <button className="create-button" onClick={handleCreateAccount}>
                            Create Account
                        </button>
                </div>
               
            )}
        </div>
    );
};


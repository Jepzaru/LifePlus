import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../LifeCss/signup.css';
import HashLoader from 'react-spinners/HashLoader'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../LifeCss/customDatepicker.css';


const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        birthDate: '',
        contactNumber: '',
        gender: '',
        username: '',
        password: '',
    });

    
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

    const handleCreateAccount = () => {
        // Prepare the data to be sent in the POST request
        const postData = {
            ...formData,
            accountType: accountType,
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
                            name="firstName"
                            variant="standard"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }}  InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Last name"
                            name="lastName"
                            variant="standard"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }} InputProps={{ style: { fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Email Address"
                            variant="standard"
                            name="emailAddress"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }} InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <DatePicker
                        selected={formData.birthDate}
                        onChange={(date) => setFormData({ ...formData, birthDate: date })}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select a date"
                        className="date-picker custom-datepicker" 
                        />
                        <TextField
                            label="Contact Number"
                            variant="standard"
                            fullWidth
                            name="contactNumber"
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }} InputProps={{ style: {  fontFamily: 'Poppins,sans-serif' } }}
                        />
                        <TextField
                            label="Gender"
                            variant="standard"
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
                            type='password'
                            variant="outlined"
                            fullWidth
                            name="password"
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '30%', marginLeft: '30px' }} InputProps={{ style: {fontFamily: 'Poppins,sans-serif' } }}
                        />
                         <TextField
                            label="Confirm Password"
                            type='password'
                            name="confirmPassword"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px', width: '45%', marginLeft: '30px' }} InputProps={{ style: {fontFamily: 'Poppins,sans-serif' } }}
                        />
                         <FormControl style={{ marginBottom: '20px', width: '15%', marginLeft: '30px' }} >
                        <InputLabel htmlFor="account-type">Account Type</InputLabel>
                        <Select
                            labelId="account-type-label"
                            id="account-type"
                            value={accountType}
                            onChange={handleAccountTypeChange}
                            displayEmpty
                            inputProps={{ name: 'accountType', id: 'account-type' }}
                        >
                            <MenuItem value="Coach">Coach</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </Select>
                    </FormControl>
                    <button className="create-button" onClick={handleCreateAccount}>
                            Create Account
                        </button>
                </div>
               
            )}
        </div>
    );
};

export default SignUpPage;

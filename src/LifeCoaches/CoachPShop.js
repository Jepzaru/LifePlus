import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import StoreIcon from '@mui/icons-material/Store';
import CoachSidenavbar from '../Life++/coachsidebar';
import CoachHeader from '../Life++/CoachHeader';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MdAddBusiness } from 'react-icons/md';
import { useAuth } from '../Life++/AuthContext';
import AddItemBox from './AddItemBox';
import axios from 'axios';

function CoachShop() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [showAddItemBox, setShowAddItemBox] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [reward, setItems] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulating loading, replace this with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Fetch items from the database using Axios
    axios.get('http://localhost:8080/reward/get')
      .then(response => {
        setItems(response.data); // Assuming your API returns an array of items
      })
      .catch(error => {
        console.error('Error fetching items:', error.message);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleAddItemClick = () => {
    setShowAddItemBox(true);
  };

  const handleCloseAddItemBox = (snackbarConfig) => {
    setShowAddItemBox(false);
    setSnackbar(snackbarConfig);
  };

  return (
    <div className={`appincoach ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
          <CoachHeader />
          <CoachSidenavbar />
          <div className='coa'>
            <h1>Point Shop</h1>
          </div>
          <div className={`coa-title${darkMode ? ' dark-mode-title' : ''}`}>
            <h1>
              <StoreIcon
                style={{ fontSize: '4rem', marginRight: '15px', marginBottom: '-15px', color: '#FF64B4' }}
              />
              Point Shop
            </h1>
          </div>
          <div className='add-item'>
            <button className='additem-btn' onClick={handleAddItemClick}>
              <MdAddBusiness style={{ marginRight: '10px', fontSize: '25px', marginBottom: '-5px' }} />
              Add Item
            </button>
          </div>
          <div className='coa-container'>
            {reward.map(reward => (
              <div className='shoppe' key={reward.id}>
                <div className='shp-name'><h2>{reward.name}</h2> <p>{reward.points}</p></div>
              </div>
            ))}
          </div>
          {showAddItemBox && (
            <>
              <AddItemBox onClose={handleCloseAddItemBox} />
              <div className="overlay" onClick={() => handleCloseAddItemBox({ open: false, message: '' })}></div>
            </>
          )}
          {snackbar.open && (
            <div className="snackbar-container">
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ open: false, message: '' })}
              >
                <MuiAlert
                  onClose={() => setSnackbar({ open: false, message: '' })}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'green'
                  }}
                >
                  {snackbar.message}
                </MuiAlert>
              </Snackbar>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CoachShop;

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
import UpdateItemBox from './UpdateItemBox';
import axios from 'axios';
import '../LifeCss/shop.css';

function CoachShop() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [showAddItemBox, setShowAddItemBox] = useState(false);
  const [showUpdateItemBox, setShowUpdateItemBox] = useState(false);
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

  const handleDeleteItemClick = async (rid) => {
    try {
      // Send a DELETE request to the server
      await axios.delete(`http://localhost:8080/reward/delete/${rid}`);
      
      // Update the state to remove the deleted item
      setItems((prevItems) => prevItems.filter(item => item.rid !== rid));
      
      // Show success message in snackbar
      setSnackbar({
        open: true,
        message: 'Item deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting item:', error.message);
      // Show error message in snackbar
      setSnackbar({
        open: true,
        message: 'Error deleting item. Please try again later.',
      });
    }
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
          {reward
          .filter(item => !item.deleted)
          .map(item => (
          <div className='shoppe' key={item.rid}>
        <div className='shp-name'>
          <h2>🛍️ {item.name}</h2> <p>Points: 🪙{item.points}</p>
          <div className='shp-action-btn'>
            <button className='update-itm-btn' onClick={() => setShowUpdateItemBox(true)}>
              Update Item
            </button>
          </div>
          <div className='shp-action-btn2'>
            <button className='dlt-itm-btn' onClick={() => handleDeleteItemClick(item.rid)}>
              Delete Item
            </button>
          </div>
        </div>
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
      {showUpdateItemBox && <UpdateItemBox onClose={() => setShowUpdateItemBox(false)} />}
    </div>
  );
}

export default CoachShop;

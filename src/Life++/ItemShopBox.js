import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Shop from '../LifeImages/pshop.png';
import '../LifeCss/boxStyles.css';
import { FaCartPlus } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { useAuth } from '../Life++/AuthContext';


const ItemShopBox = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const { login } = useAuth();
  const [storedUser, setStoredUser] = useState(null);
  useEffect(() => {
    // Fetch user from local storage and log in
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);
    }
    console.log("User", storedUser);
  }, [login, storedUser]);

  useEffect(() => {

    axios.get('http://localhost:8080/reward/get')
      .then(response => {
        setItems(response.data); // assuming the API returns an array of items
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []); // empty dependency array ensures the effect runs once when the component mounts
  const handlePurchase = async (userId, rewardId) => {
    try {

      const response = await axios.post(`http://localhost:8080/user/buy/${userId}/${rewardId}`);
      console.log('Item purchased:', response.data);
      // Handle success, update UI, or show a success message
    } catch (error) {
      console.error('Error purchasing item:', error);
      // Handle error, show an error message, etc.
    }
  };
    useEffect(() => {
    if (storedUser?.items) {
      console.log('Stored User Items:', storedUser.items);
    }
  }, [storedUser]);
  
  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="item-floating-box-header">
          <img src={Shop} alt="Item Shop" style={{ width: '80px', height: '50px' }} />
          <h2>Item Shop</h2>
          <h2 style={{ marginLeft: '300px' }}>Points: </h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="item-shop-box-content">
          {items.map(item => (
            <div className='user-shop' key={item.rid}>

              <div className='shop-name'>
                <h2><CgShoppingBag /> {item.name}</h2> <p>Points: 🪙{item.points}</p>
                <div className='shop-action-btn'>
                  {storedUser?.items?.some(userItem => JSON.stringify(userItem) === JSON.stringify(item))? (
                    <button  className='buy-itm-btn' disabled>
                      <FaCartPlus style={{ marginRight: '10px' }} />
                      Purchased
                    </button>
                  ) : (
                    <button
                      className='buy-itm-btn'
                      onClick={() => handlePurchase(storedUser?.userid, item.rid)}
                    >
                      <FaCartPlus style={{ marginRight: '10px' }} />
                      Purchase Item
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemShopBox;

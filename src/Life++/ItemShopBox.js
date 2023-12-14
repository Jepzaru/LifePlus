import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Shop from '../LifeImages/pshop.png';
import '../LifeCss/boxStyles.css';
import { FaCartPlus } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";


const ItemShopBox = ({ onClose }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    axios.get('http://localhost:8080/reward/get')
      .then(response => {
        setItems(response.data); // assuming the API returns an array of items
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []); // empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="item-floating-box-header">
          <img src={Shop} alt="Item Shop" style={{ width: '80px', height: '50px'}} /> 
          <h2>Item Shop</h2>
          <h2 style={{marginLeft: '300px'}}>Points: </h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="item-shop-box-content">
          {items.map(item => (
            <div className='user-shop' key={item.id}>
            
            <div className='shop-name'>
                  <h2><CgShoppingBag /> {item.name}</h2> <p>Points: 🪙{item.points}</p>
                  <div className='shop-action-btn'>
                    <button className='buy-itm-btn'><FaCartPlus style={{marginRight: '10px'}}/>Purchase Item</button>
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

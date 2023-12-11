// ItemShopBox.js

import React from 'react';
import Shop from '../LifeImages/pshop.png';
import '../LifeCss/boxStyles.css';

const ItemShopBox = ({ onClose }) => {
  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header">
        <img src={Shop} alt="Item Shop" style={{ width: '80px', height: '50px'}} /> <h2>Item Shop</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content item-shop-box-content">
        </div>
      </div>
    </div>
  );
};

export default ItemShopBox;

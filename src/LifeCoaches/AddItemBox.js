// AddItemBox.js

import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../LifeCss/AddItemBox.css'; // Add your CSS styling for AddItemBox
import { IoClose } from "react-icons/io5";

const AddItemBox = ({ onClose }) => {
  // State variables for the component
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async () => {
    try {
      // Add your logic to handle item creation here
      
      // Show a success snackbar
      onClose({
        open: true,
        message: 'Item Successfully Added',
      });
    } catch (error) {
      // Handle errors if item creation fails
      console.error('Error adding item:', error);
    }
  };

  return (
    <div id="add-item-box" className="add-item-box">
      <h1>Add New Item</h1>
      <div className="closeitem">
        <button className="add-item-close" onClick={() => onClose({ open: false, message: '' })}>
          <IoClose />
        </button>
      </div>
      <div className="add-item-con">
        <div className="item-name-tit">
          <h3>Item Name</h3>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="item-des">
          <h3>Item Description</h3>
          <textarea
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="item-points"> 
          <h3>Points</h3>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>

        <div className="add-item-save">
          <button className="add-save" onClick={handleSubmit}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemBox;

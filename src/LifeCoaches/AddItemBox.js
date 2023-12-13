// AddItemBox.js

import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../LifeCss/AddItemBox.css'; 
import { IoClose } from "react-icons/io5";

const AddItemBox = ({ onClose }) => {
  // State variables for the component
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async () => {
    try {
      
      const response = await fetch('http://localhost:8080/reward/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          points,
        }),
      });

      if (response.ok) {
        // Show a success snackbar
        onClose({
          open: true,
          message: 'Item Successfully Added',
        });
        
        setName('');
        setPoints('');
      } else {
       
        console.error('Error adding item:', response.statusText);
      }
    } catch (error) {
      
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

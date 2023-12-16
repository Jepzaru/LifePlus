// AddItemBox.js

import React, { useState } from 'react';
import '../LifeCss/AddItemBox.css'; 
import { IoClose } from "react-icons/io5";

const CreateAchievementBox = ({ onClose }) => {
  // State variables for the component
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [point, setPoint] = useState('');

  const handleSubmit = async () => {
    try {
      if (name.trim() === '' || point.trim() === '') {
        // If any of the fields are empty, show an alert and return
        alert('Please fill in all fields before adding the item.');
        return;
      }

      const response = await fetch('http://localhost:8080/achievement/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          point,
        }),
      });

      if (response.ok) {
        
        onClose({
          open: true,
          message: 'Item Successfully Added',
        });

        setName('');
        setPoint('');
      } else {
        console.error('Error adding item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div id="add-item-box" className="add-item-box">
      <h1>Add Achievements</h1>
      <div className="closeitem">
        <button className="add-item-close" onClick={() => onClose({ open: false, message: '' })}>
          <IoClose />
        </button>
      </div>
      <div className="add-item-con">
        <div className="item-name-tit">
          <h3>Achievements Title</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="item-name-des">
          <h3>Description</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="item-points"> 
          <h3>Points</h3>
          <input
            type="text"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
        </div>

        <div className="add-item-save">
          <button className="add-save" onClick={handleSubmit}>
            Add achievement
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAchievementBox;

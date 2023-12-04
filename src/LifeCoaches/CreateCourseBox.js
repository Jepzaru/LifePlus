import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';

const CreateCourseBox = ({ onClose }) => {
  const [isOutro, setIsOutro] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image1); // Set the initial selected image

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('create-course-box').classList.add('visible');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleOutro = () => {
    setIsOutro(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <div id="create-course-box" className={`create-course-box ${isOutro ? 'outro' : ''}`}>
      <h1>Create New Course</h1>
      <div className='closecourse'>
        <button className='create-course-close' onClick={handleOutro}>Cancel</button>
      </div>
      <div className='create-course-con'>
      <div className='image-selector'>
        <h3>Select Course Image</h3>
        <div className='image-options'>
          <img
            src={image1}
            alt="1"
            onClick={() => handleImageClick(image1)}
            className={selectedImage === image1 ? 'selected' : ''}
          />
          <img
            src={image2}
            alt="2"
            onClick={() => handleImageClick(image2)}
            className={selectedImage === image2 ? 'selected' : ''}
          />
        </div>
        {selectedImage && (
          <div>
            <h4>Selected Course Image:</h4>
            <img src={selectedImage} alt="Selected Course Image" />
          </div>
        )}
      </div>
        <div className='course-name-tit'>
        <h3>Course Title</h3>
        <input type="text" />
        </div>
        <div className='course-des'>
          <h3>Course Description</h3>
          <textarea></textarea>
        </div>
        <div className='course-capa-max'>
          <h3>Course Maximum Capacity</h3>
          <input className='max-capa' type="text" />
        </div>
    
        <div className='create-course-save'>
          <button className='create-save'>Create Course</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseBox;
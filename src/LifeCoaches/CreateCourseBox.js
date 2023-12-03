import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';
import { useAuth } from '../Life++/AuthContext';
import axios from 'axios';

const CreateCourseBox = ({ onClose }) => {
  const { user } = useAuth();
  const [isOutro, setIsOutro] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseData, setCourseData] = useState({
    name: '',
    max: '',
    description: '',
    coach: null,
  });
  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/coach/get');
        const coaches = response.data; // Assuming the response contains an array of coaches
  
        // Find a coach whose username matches user.username
        const foundCoach = coaches.find(coach => coach.username === user.username);
  
        if (foundCoach) {
          // If a coach with matching username is found, set the coachData in state
          setCourseData(prevData => ({ ...prevData, coach: foundCoach }));
          console.log('Found Coach:', foundCoach); // Log the found coach
        } else {
          console.log('Coach not found for the user');
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };
  
    fetchCoachData();
  }, [user.username]);
  console.log('User username:', user.username);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'max' ? parseInt(value, 10) : value;
    setCourseData({ ...courseData, [name]: parsedValue });
  };
  const handleSubmit = async () => {
    try {
      const newCourse = {
        ...courseData,
      };

      const response = await axios.post('http://localhost:8080/course/insert', newCourse);
      // Handle successful response if needed
      console.log('New course created:', response.data);
      // Close the create course box or perform other actions
      onClose();
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error creating course:', error);
    }
  };

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
          {selectedImage && <img src={selectedImage} alt="Selected Course Image" />}
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
          <button className='create-save' onClick={handleSubmit}>
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseBox;

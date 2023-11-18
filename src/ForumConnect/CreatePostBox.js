
import React, { useState } from 'react';
import axios from 'axios';
import '../ForumStyle/CreatePost.css';

function CreatePostBox({ onClose, onSubmit, userID, setAllPosts }) {
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post('http://hyeumine.com/forumNewPost.php', {
        id: userID,
        post: postContent,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === 'OK') {
          // Alert for a successful post
          window.alert('Post successfully posted!');
          const newPost = response.data;
          setAllPosts(prevPosts => [newPost, ...prevPosts]);
          console.log(response.data);
        } else {
          // Alert for an unsuccessful post
          window.alert('Post was not successfully posted.');
        }
      })
      .catch((error) => {
        // Alert for an error
        window.alert('Error posting content: ' + error.message);
        console.error('Error posting content:', error);
      });

    setPostContent('');
    onClose();
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-box">
        <div className="head">
          <h1>Create Post</h1>
        </div>
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handlePostChange}
        />
        <div className="create-post-box-buttons">
          <button onClick={handleSubmit}>Post</button>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostBox;

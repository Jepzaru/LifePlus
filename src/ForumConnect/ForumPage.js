import React, { useState, useEffect } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import { AiOutlineIdcard } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import { FaTrashAlt } from 'react-icons/fa';
import { BiCommentDots } from 'react-icons/bi';
import '../ForumStyle/ForumPage.css';
import CreatePostBox from './CreatePostBox';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ForumPage({ userId, username }) {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 2;
  const [allPosts, setAllPosts] = useState([]);
  const [commentInputsVisible, setCommentInputsVisible] = useState({});
  const [replyText, setReplyText] = useState('');
  const [viewingCommentsPostId, setViewingCommentsPostId] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchPosts();
    const fetchInterval = setInterval(fetchPosts, 1000); 

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  const fetchPosts = () => {
    axios
      .get(`http://hyeumine.com/forumGetPosts.php`)
      .then((response) => {
        if (!(response.status === 200 && response.statusText === 'OK')) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then((data) => {
        const filteredPosts = data.filter((post) => post.post !== null && post.post.trim() !== '');
        const sortedPosts = filteredPosts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      
        if (sortedPosts.length > 0) {
          setAllPosts(sortedPosts);
          setLastUpdate(new Date()); 
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setPosts(allPosts.slice(startIndex, endIndex));
  }, [page, allPosts]);

  const hasPosts = posts.length > 0;

  const handleCreatePostClick = () => {
    setCreatePostOpen(true);
  };

  const handleCloseCreatePost = () => {
    setCreatePostOpen(false);
  };


  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(allPosts.length / postsPerPage);
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const toggleCommentInput = (postId) => {
    setCommentInputsVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleRemovePost = (postId) => {
    axios
      .get(`http://hyeumine.com/forumDeletePost.php?id=${postId}`)
      .then((response) => {
        if (!(response.status === 200 && response.statusText === "OK")) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then((message) => {
        console.log(message);
        setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  async function handleReplySubmit(postId) {
    axios
      .post('http://hyeumine.com/forumReplyPost.php', {
        user_id: userId,
        post_id: postId,
        reply: replyText,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === 'OK') {
          const newReply = response.data;
  
          setAllPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post.id === postId) {
                const updatedReplies = [...(post.reply || []), newReply];
                return { ...post, reply: updatedReplies };
              }
              return post;
            });
          });
  
          setReplyText('');
          alert('Reply successfully posted.');
        } else {
          alert('Failed to post the reply. Please try again.');
        }
      })
      .catch((error) => {
        alert('Failed to post the reply. Please try again.');
        console.error('Error posting content:', error);
      });
  }
  

  const calculatePaperHeight = (content) => {
    const minHeight = 300;
    const extraPadding = 40;
    const contentHeight = Math.max(minHeight, content.scrollHeight + extraPadding);

    return contentHeight;
  };

  const toggleCommentVisibility = (postId) => {
    if (viewingCommentsPostId === postId) {
      
      setViewingCommentsPostId(null);
    } else {
     
      setViewingCommentsPostId(postId);
    }
  };

 
  const openCommentDialog = (postId) => {
    const selectedPost = allPosts.find((post) => post.id === postId);
    if (selectedPost) {
      setSelectedPost(selectedPost);
      setCommentDialogOpen(true);
    }
  };

  const closeCommentDialog = () => {
    setSelectedPost('');
    setCommentDialogOpen(false);
  };
  async function handlePostSubmit(postContent){
    axios
      .post('http://hyeumine.com/forumNewPost.php', {
        id: userId,
        post: postContent,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === 'OK') {
          const newPost = response.data;
          // Update the allPosts state with the new post
          setAllPosts((prevPosts) => [newPost, ...prevPosts]);
          alert('Post successfully posted.');
        } else {
          alert('Failed to post the new post. Please try again.');
        }
      })
      .catch((error) => {
        alert('Failed to post the new post. Please try again.');
        console.error('Error posting content:', error);
      });

    setCreatePostOpen(false);
  };

  return (
    <div className="forum-connect-container">
      {hasPosts && (
        <div>
          <div className="user-info">
            <p>
              <AiOutlineIdcard style={{ fontSize: '1.2rem', marginRight: '5px', color: '#0056b3', marginBottom: '-4px' }} />&nbsp;{`User ID: ${userId}`}
            </p>
          </div>
          <div className="username-info">
            <p>
              <FaUserCheck style={{ fontSize: '1rem', marginRight: '5px', color: '#0056b3', marginTop: '5px' }} />{`User: ${username}`}
            </p>
          </div>
          <div className="breadcrumbed">
            <ul>
              <div className="posted">
                <button onClick={handleCreatePostClick} className="posted-button">
                  <BsFilePost style={{ fontSize: '1.5rem', marginRight: '5px', color: 'white', marginTop: '-10px', marginBottom: '-5px' }} />&nbsp;
                  Create Post
                </button>
              </div>
              <div className="logout">
                <Link to="/" className="logout-button">
                  <LuLogOut style={{ fontSize: '1.5rem', marginRight: '5px', color: 'white', marginTop: '-10px', marginBottom: '-5px' }} />&nbsp;
                  Log out
                </Link>
              </div>
            </ul>
          </div>
          <div className="titled">
            <h1>ForumConnect</h1>
          </div>
          <div className="white-container">
          {isCreatePostOpen && <CreatePostBox onClose={handleCloseCreatePost} onSubmit={handlePostSubmit} userID={userId} setAllPosts={setAllPosts} />}

            <div className="horizontal-posts">
              {posts.map((post, id) => (
                <Paper key={id} style={{ padding: '10px', textAlign: 'center', width: '25%', margin: '30px 20px', borderRadius: '15px', height: calculatePaperHeight(post) }}>
                  <div className="profile-pic-container"></div>
                  <h5 style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'left', color: 'white', marginTop: '-45px', marginLeft: '70px', marginBottom: '50px' }}>
                    User:&nbsp;&nbsp;&nbsp;<span style={{ fontSize: '18px' }}>{post.user}</span>
                  </h5>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '42px', color: 'white' }}>{post.post}</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                      <Button
                        variant="contained"
                        style={{ width: '300px', fontSize: '15px', borderRadius: '15px', marginLeft: '30px' }}
                        onClick={() => toggleCommentInput(post.id)}
                      >
                        <BiCommentDots style={{ marginRight: '10px', fontSize: '2rem' }} />
                        Comment
                      </Button>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      <Button variant="contained" color="error" style={{ width: '300px', fontSize: '15px', borderRadius: '15px' }}
                        onClick={() => handleRemovePost(post.id)}>
                        <FaTrashAlt style={{ marginRight: '10px', fontSize: '1.5rem' }} />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="comment">
                    {commentInputsVisible[post.id] && (
                      <div className="comment-input">
                        <input type="text"
                          placeholder="Enter your comment"
                          style={{ width: '60%', padding: '5px', borderRadius: '10px', fontFamily: 'Poppins,sans-serif' }}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          style={{ fontSize: '15px', borderRadius: '15px', width: '15%', marginLeft: 'px', height: '20%' }}
                          onClick={() => handleReplySubmit(post.id)}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    <span
                      className='viewreplies'
                      style={{ color: 'white', cursor: 'pointer' }}
                      onClick={() => openCommentDialog(post.id)} 
                    >
                      View Comments
                    </span>
                  </div>
                  </Paper>
              ))}
            </div>

            <div className="pagination-buttons">
              <Button variant='contained' onClick={handlePreviousPage} disabled={page === 1}>
                Previous Page
              </Button>
              <Button variant='contained' onClick={handleNextPage}>
                Next Page
              </Button>
            </div>
          </div>
          <div className="last-update-time">
            Last Update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
          </div>
        </div>
      )}
    <Dialog open={commentDialogOpen} onClose={closeCommentDialog} fullWidth maxWidth="md">
  <DialogTitle>Comments</DialogTitle>
  <DialogContent>
    {selectedPost && selectedPost.reply && Array.isArray(selectedPost.reply) && selectedPost.reply.length > 0 ? (
      selectedPost.reply.map((comment, id) => (
        <Paper key={id} style={{ backgroundColor: 'white', height: '30%' }}>
          {comment.reply}
        </Paper>
      ))
    ) : (
      <span style={{ color: 'black' }}>No Comments Available</span>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={closeCommentDialog} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}

export default ForumPage;
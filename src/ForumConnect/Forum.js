import axios from 'axios';
import '../ForumStyle/Forum.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

function Forum() {
  const [user,setUser] = useState(null);
  const [posts, setPosts] = useState([{}]);
  const [page,setPage] = useState(1)
  const [loader, setLoader] = useState(1)

    
    useEffect(()=>{
      axios.get(`http://hyeumine.com/forumGetPosts.php?page=${page}`)
          .then(response => {
              if (!(response.status===200 && response.statusText==="OK")) {
              throw new Error('Network response was not ok');
              }
              return response.data;
          })
          .then(data => {
            setPosts(data);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  },[page,loader])

  async function setReply(postid){
    await axios.post(`http://hyeumine.com/forumReplyPost.php`, {
        user_id: user.id,
        post_id: postid,
        reply: document.getElementById("replyni").value
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (!(response.status===200 && response.statusText==="OK")) {
            throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .then(message => {
          console.log(message)
          console.log(">")
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        }).finally(()=>{
          setLoader(Math.random()*1000);
         });
  }

  return (
    <div className="App">
      {user===null?<><input type="text" id="nuname"></input>
      <input type="password" id="npword"></input>
      <Button onClick={()=>{
       axios.post(`http://hyeumine.com/forumLogin.php`, {
        username: document.getElementById("nuname").value,
        password: document.getElementById("npword").value
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
       .then(response => {
        console.log(response)
           if (!(response.status==200 && response.statusText=="OK")) {
           throw new Error('Network response was not ok');
           }
           return response.data.user;
       })
       .then(us => {
        console.log(us);
          setUser(us)
       })
       .catch(error => {
           console.error('There was a problem with the fetch operation:', error);
       });
      }}>Login User</Button>
      <br/><br/>
      
      <input type="text" id="uname"></input>
      <input type="password" id="pword"></input>
      <Button onClick={()=>{
       axios.post(`http://hyeumine.com/forumCreateUser.php`, {
       username: document.getElementById("uname").value,
       password: document.getElementById("pword").value
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
       .then(response => {
           if (!(response.status==200 && response.statusText=="OK")) {
           throw new Error('Network response was not ok');
           }
           return response.data;
       })
       .then(us => {
          setUser(us)
       })
       .catch(error => {
           console.error('There was a problem with the fetch operation:', error);
       })
      }}>Create User</Button></>:<>ID: {user.id} | {user.username}
        <br/>
        <textarea id="postni"></textarea><br/>
        <Button variant='contained' onClick={()=>{
          axios.post(`http://hyeumine.com/forumNewPost.php`, {
            id: user.id,
            post: document.getElementById("postni").value
             }, {
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
               }
           })
            .then(response => {
                if (!(response.status==200 && response.statusText=="OK")) {
                throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then(message => {
              console.log(message)
              
          setLoader(Math.random()*1000);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }}>Post a post</Button>
        
        </>}
        <br/>
        <Button variant='contained' onClick={()=>{
          page>1? setPage(page-1): setPage(1)
        }}>Previous Page</Button>
        <Button variant='contained' onClick={()=>{
          setPage(page+1)
        }}>Next Page</Button>
      {posts.map((post, id)=>{
          return <Paper key={id} style={{ padding:'10px', textAlign:'right', width:"80%", margin:'15px auto'}}>
                <Button variant='contained' color="error" style={{fontSize:"8px"}}
                onClick={()=>{
                  axios.get(`http://hyeumine.com/forumDeletePost.php?id=${post.id}`)
                    .then(response => {
                        if (!(response.status==200 && response.statusText=="OK")) {
                        throw new Error('Network response was not ok');
                        }
                        return response.data;
                    })
                    .then(message => {
                      console.log(message)
                      setLoader(Math.random()*1000);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                }}>X</Button>
                <h2>{post.post}</h2>
                <h5>{post.user}</h5>
                <input type='text' id="replyni"/><Button variant="contained"
                 onClick={()=>{
                  setReply(post.id)
                }}>Reply</Button><br/>
                <span className='viewreplies'>View Replies</span>
                <div className='divhidden'>
                {post.reply?
                post.reply.map((reply,id)=>{
                  return <Paper key={id} style={{margin:'10px', padding:'5px'}}>{reply.reply}</Paper>
                }):<></>}
                </div>
              </Paper>
      })}
    </div>
  );
}

export default Forum;

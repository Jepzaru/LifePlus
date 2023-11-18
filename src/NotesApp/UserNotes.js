import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserNotes({ userId }) {
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://hyeumine.com/mynotes.php?id=${userId}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUserNotes(response.data);
        } else {
          console.error('Invalid response data:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching user notes:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Notes</h2>
      <ul>
        {userNotes.map((note) => (
          <li key={note.id}>{note.note}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserNotes;

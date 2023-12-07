import React, { useEffect } from 'react';
import CoachSidenavbar from '../Life++/coachsidebar';
import CoachHeader from '../Life++/CoachHeader';
import { useAuth } from '../Life++/AuthContext'; // Import useAuth

function CoachQuest() {
  const { login } = useAuth(); // Get login function from useAuth

  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  return (
    <div className="appindex">
      <CoachHeader />
      <CoachSidenavbar />
      {/* ... rest of the component code ... */}
    </div>
  );
}

export default CoachQuest;

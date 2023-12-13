import React, { useState, useEffect } from 'react';
import Achievement from '../LifeImages/achivement.png';
import '../LifeCss/boxStyles.css';
import jsPDF from 'jspdf';
import { useAuth } from '../Life++/AuthContext';

const AchievementBox = ({ onClose }) => {
  const { user, login } = useAuth();
  const [certificateClaimed, setCertificateClaimed] = useState(false);

  const handleClaimCertificate = () => {
    // Check if the certificate has already been claimed
    if (!certificateClaimed) {
      setCertificateClaimed(true);
    }
  };

  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []);

  useEffect(() => {
    if (certificateClaimed && user) {
      generateCertificatePDF(user.name);
    }
  }, [certificateClaimed, user]);

  const generateCertificatePDF = (username) => {
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
  

    pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');
  
    
    pdf.setFontSize(24);
    pdf.text('Certificate of Achievement', pdf.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
  
    pdf.setFontSize(10);
    pdf.text(
      `This is to certify that ${username} has achieved a first-ever certificate for logging-in in Life++ 🎉.`,
      30,
      60
    );
  
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    pdf.text(`Date: ${dateStr}`, pdf.internal.pageSize.getWidth() - 60, pdf.internal.pageSize.getHeight() - 30, {
      align: 'right',
    });
  
    pdf.save('certificate.pdf');
  };

  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header">
          <img src={Achievement} alt="Achievement" style={{ width: '80px', height: '50px' }} />{' '}
          <h2>Achievements</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content achievement-box-content">
          <div className="certificate">
            <h2>Welcome Certificate</h2>
            {certificateClaimed ? (
              <p>Certificate claimed successfully!</p>
            ) : (
              <div className="certi">
                <button className="claim-cert" onClick={handleClaimCertificate}>
                  Claim Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBox;

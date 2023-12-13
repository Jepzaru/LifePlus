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
  
    // Background styling
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
  
    // Border styling
    pdf.setLineWidth(2);
    pdf.setDrawColor(0, 102, 204); // Border color
    pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 'S');
  
    // Title styling
    pdf.setFont('Arial', 'bold');
    pdf.setFontSize(40);
    pdf.setTextColor(0, 102, 204); // Dark Blue
    const titleText = 'Certificate of Achievement';
    const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(titleText, (pdf.internal.pageSize.getWidth() - titleWidth) / 2 + 80, 30, { align: 'center' });
  
    // Line separator
    pdf.setLineWidth(1);
    pdf.setDrawColor(0); // Reset color
    pdf.line(30, 70, pdf.internal.pageSize.getWidth() - 30, 70); // Horizontal line below the title
  
    // Content styling
    pdf.setFont('Times', 'normal');
    pdf.setFontSize(18);
  
    // Centering the name
    const nameText = `${username}`;
    const nameWidth = pdf.getStringUnitWidth(nameText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(nameText, (pdf.internal.pageSize.getWidth() - nameWidth) / 2 + 20, 120, { align: 'center' });
  
    // Description styling
    pdf.setFontSize(14);
    pdf.setTextColor(34, 34, 34); // Black
    const descriptionText = 'has achieved a first-ever certificate for logging in to Life++. Congratulations!';
    const descWidth = pdf.getStringUnitWidth(descriptionText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(descriptionText, (pdf.internal.pageSize.getWidth() - descWidth) / 2 + 80, 150, { align: 'center' });
  
    // Line separator
    pdf.setLineWidth(1);
    pdf.line(30, 200, pdf.internal.pageSize.getWidth() - 30, 200); // Horizontal line below the description
  
    // Date styling
    pdf.setFontSize(12);
    pdf.setTextColor(128, 128, 128); // Gray
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    pdf.text(`Date: ${dateStr}`, 30, pdf.internal.pageSize.getHeight() - 30);
  
    // Save the PDF
    pdf.save('certificate.pdf');
  };
  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header">
          <img src={Achievement} alt="Achievement" style={{ width: '80px', height: '50px' }} />
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

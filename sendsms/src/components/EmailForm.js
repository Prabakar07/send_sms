import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to send SMS with OTP
      const response = await axios.post('http://localhost:3000/send-welcome-sms', { phoneNumber });
      console.log('OTP sent successfully!');
      // Optionally, show a success message to the user
      setVerificationMessage('OTP sent to your phone number. Please check and enter the OTP below.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Optionally, show an error message to the user
      setVerificationMessage('Error sending OTP. Please try again later.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to verify the OTP
      await axios.post('http://localhost:3000/verify-otp', { phoneNumber, otp });
      console.log('OTP verified successfully!');
      // Optionally, show a success message to the user
      setVerificationMessage('OTP verified successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Optionally, show an error message to the user
      setVerificationMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      <form onSubmit={handleSendOTP}>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
          required
        />
        <button type="submit">Send OTP</button>
      </form>

      <br/>

      {verificationMessage && (
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChangeOtp}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
}

export default EmailForm;

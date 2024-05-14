const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Nexmo = require('nexmo');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Object to store OTPs
const otps = {};

// Set up Nexmo client
const nexmo = new Nexmo({
  apiKey: 'd580e610',
  apiSecret: 'gHPQWhZT3CL6Bb4a'
});

// Route to send welcome SMS with OTP
app.post('/send-welcome-sms', (req, res) => {
  const { phoneNumber } = req.body;

  // Generate a random OTP
  const otp = generateOTP();

  // Store the OTP in the otps object with the phone number as key
  otps[phoneNumber] = otp;

  // Send SMS using Nexmo
  const from = 'NEXMO';
  const to = phoneNumber;
  const text = `Welcome to our newsletter! Your OTP is: ${otp}. Please use this OTP to verify your phone number.`;

  nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.error('Error sending welcome SMS:', err);
      res.status(500).json({ error: 'Failed to send welcome SMS', errorMessage: err.message });
    } else {
      console.log('Welcome SMS sent successfully:', responseData);
      res.json({ message: 'Welcome SMS sent successfully' });
    }
  });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Check if the OTP matches the one stored for the phone number
  if (otp === otps[phoneNumber]) {
    // OTP is verified
    console.log('OTP verified successfully!');
    res.json({ message: 'OTP verified successfully' });
  } else {
    // OTP verification failed
    console.error('OTP verification failed');
    res.status(400).json({ error: 'OTP verification failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

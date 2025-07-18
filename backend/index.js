process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', function (reason, promise) {
  console.error('Unhandled Rejection:', reason);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TO_PHONE = process.env.TO_PHONE || '+919822650850'; // Prashant's number
const FROM_PHONE = process.env.FROM_PHONE; // Your Twilio number



console.log('Twilio SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Twilio FROM_PHONE:', FROM_PHONE);
console.log('Twilio TO_PHONE:', TO_PHONE);

app.post('/api/contact', async (req, res) => {
  const { name, phone, type } = req.body;
  console.log('Received contact request:', req.body);
  if (!name || !phone || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const message = `New Insurance Lead from Website:\nName: ${name}\nPhone: ${phone}\nCategory: ${type}`;
  try {
    console.log('Attempting to send SMS via Twilio...');
    const msg = await twilioClient.messages.create({
      body: message,
      messagingServiceSid: 'MG980c513d569e9787feb70ba351c64955',
      to: TO_PHONE,
    });
    console.log('SMS sent successfully, SID:', msg.sid);
    res.json({ success: true });
  } catch (err) {
    // Log the full error object
    console.error('Twilio error:', err);
    // Return the error as a string for debugging
    res.status(500).json({ error: 'Failed to send SMS', details: err.message, full: JSON.stringify(err, Object.getOwnPropertyNames(err)) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
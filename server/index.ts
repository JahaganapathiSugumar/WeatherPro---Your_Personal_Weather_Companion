import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AlertSubscription } from './models/AlertSubscription';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri');

app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email, location, latitude, longitude } = req.body;

    const subscription = new AlertSubscription({
      name,
      email,
      location,
      coordinates: {
        latitude,
        longitude
      }
    });

    await subscription.save();

    res.status(201).json({ message: 'Successfully subscribed to weather alerts' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Failed to subscribe to weather alerts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
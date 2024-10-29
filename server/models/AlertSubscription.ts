import mongoose from 'mongoose';

const alertSubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: String,
    longitude: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const AlertSubscription = mongoose.model('AlertSubscription', alertSubscriptionSchema);
import mongoose from 'mongoose';

const contactClientSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type: String },
  question: { type: String },
  prefMessenger: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ContactClient = mongoose.model('ContactClient', contactClientSchema);

export default ContactClient;
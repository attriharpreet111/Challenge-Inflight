import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  issueMessage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  deadline: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
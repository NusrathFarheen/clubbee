const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  image: { type: String }, // URL to event image
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Event', EventSchema);

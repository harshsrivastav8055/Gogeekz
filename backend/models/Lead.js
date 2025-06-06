// backend/models/Lead.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Express Entry", "Study Permit", "Work Permit"],
    required: true,
  },
  customFields: { type: Map, of: String },
  checklist: [
    {
      item: String,
      completed: { type: Boolean, default: false },
    },
  ],
  documents: [String],
});

module.exports = mongoose.model("Lead", leadSchema);

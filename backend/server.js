// backend/server.js

const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
      console.log("Hello")
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit with failure
  }
};

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

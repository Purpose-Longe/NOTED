const mongoose = require("mongoose");

const connectDB = async () => {

    if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
  
};
module.exports = connectDB;

require('dotenv').config();
const mongoose = require('mongoose');

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to mongodb successfully');
  } catch (error) {
    console.error('connectMongodb', error);
  }
};

module.exports = {
  connectMongodb,
};

const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose.connect('mongodb://localhost:27017/TaskManagementSystem')
    .then(() => {
      console.log('MongoDB is connected successfully');
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
};

module.exports = { dbConnection };

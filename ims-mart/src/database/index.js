const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ims-mart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db; 

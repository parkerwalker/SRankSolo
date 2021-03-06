var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'localhost:27017/srankLogin');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;

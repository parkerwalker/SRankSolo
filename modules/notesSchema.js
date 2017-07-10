var mongoose = require('mongoose');

mongoose.connect('localhost:27017/srankLogin');

var notesSchema = new mongoose.Schema({
  username: String,
  password: String
});

var notesModel = mongoose.model('notesModel', notesSchema);

module.exports = notesModel;

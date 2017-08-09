var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'localhost:27017/srankLogin');

var notesSchema = new mongoose.Schema({
  notes: String,
  players: Array,
  lane: String,
  createdBy: String
});

var notesModel = mongoose.model('notesModel', notesSchema);

module.exports = notesModel;

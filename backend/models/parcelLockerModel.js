const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelLockerSchema = new Schema({
	numberParcelLocker: String,
	name: String
  });
  

module.exports = mongoose.model('ParcelLocker', parcelLockerSchema);

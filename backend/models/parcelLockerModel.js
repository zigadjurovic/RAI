const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelLockerSchema = new Schema({
  numberParcelLocker: String,
  name: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  owner: String,
  others: [String]
});

module.exports = mongoose.model('ParcelLocker', parcelLockerSchema);

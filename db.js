
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String, max: 100 },
  lastName: { type: String, max: 100 },
  phoneNumber: { type: Number, max: 100 },
  city: { type: String, max: 100 },
  email: { type: String, max: 100 },
  dateOfBirth: { type: String, max: 100 },

});
module.exports = mongoose.model("NewUser", UserSchema);
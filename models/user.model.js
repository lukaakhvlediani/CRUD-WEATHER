const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName:{
      type:String,
      required:true,
  },
  lastName:{
      type:String,
      required:true,
      unique:true
  },
  phoneNumber:{
    type:Number,
    required:true,
    },
    city:{
      type:String,
      required:true,
    },
  email:{
    type:String,
    required:true,
  },
  date:{
    type:String,
    required:true,
  },
  children:{
    type:Boolean,
    required:true,
  },
  languageLevel:{
    type:String,
    required:true,
  },
  nativeLanguage:{
    type:String,
    required:true,
  }

});


module.exports = mongoose.model('User', UserSchema);
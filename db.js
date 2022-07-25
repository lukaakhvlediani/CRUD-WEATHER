
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WeatherSchema = new Schema({
  identifier:{type: String,max:100} ,
  wind: { type: String, max: 100 },
  rainfall: { type: String, max: 100 },
  humidity: { type: String, max: 100 },
  visibility: { type: String, max: 100 },
  pressure: { type: String, max: 100 },
});
module.exports = mongoose.model("NewWeather", WeatherSchema);
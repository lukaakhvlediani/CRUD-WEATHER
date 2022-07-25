const Weather = require("../models/weather.model");

require("dotenv").config();
const signature = process.env.JWT_SECRET;



exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

exports.addWeather = async (req, res) => {
  try {
    const {
      city,
      weather,
      temperature,
      uvIndex,
      wind,
      rainfall,
      humidity,
      visibility,
      pressure,
    } = req.body;
    
    const newWeather = new Weather({
      city,
      weather,
      temperature,
      uvIndex,
      wind,
      rainfall,
      humidity,
      visibility,
      pressure,
    });
    const resultSave = await newWeather.save();
    console.log(req.body);
    return res.status(200).send({
      message: "ok",
      data: resultSave,
    });
  } catch (error) {
    console.log(error.message, "catch error addWeather");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};
exports.updateWeather = async(req,res) =>{
    try {
    console.log("req.body==>", req.params.id);

    await Weather.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
      async () => {
        return await res.send(req.body).status(200);
      }
    );
  } catch (error) {
    console.log(error.message, "catch error updateWeather");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.getWeather = async(req,res)=>{
    try {
    const weather = await Weather.find({});
    console.log(weather,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    return res.status(200).send({
      message: "ok",
      data: weather,
    });
  } catch (error) {
    console.log(error.message, "catch error getWeather");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};
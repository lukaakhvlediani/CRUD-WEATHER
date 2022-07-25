const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

const weather_controller = require("../controllers/weather.controller");
 


router.post("/add-weather",  weather_controller.addWeather)
router.put("/:id/update-weather",  weather_controller.updateWeather)
router.get("/get-weather", weather_controller.getWeather)


module.exports = router;
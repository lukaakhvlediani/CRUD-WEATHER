const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/weather.route");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./models/weather.model");
const Weather = require("./db");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

let dev_db_url = "mongodb://localhost:27017/Weather";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

//msql new
const dbConfig = require("./mysql.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const mysqlDb = {};
mysqlDb.Sequelize = Sequelize;
mysqlDb.sequelize = sequelize;
mysqlDb.weather = require("./models/weather.mysql.model.js")(sequelize, Sequelize);
module.exports = mysqlDb;

mysqlDb.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("connected", console.error.bind(console, "MongoDB connected"));
app.use(cors());


const root = {
  getWeather: async ({ id }) => {
    const weather = await Weather.findOne({ id });
    console.log(weather);
    return weather;
  },
  getAllWeather: async () => {
    console.log(Weather);
    const mongoWeather = await Weather.find({});
    const mysqlWeather =  await mysqlDb.weather.findAll({});

    console.log("getAllWeather", mysqlWeather, mongoWeather)

    const newArr = [];

    mongoWeather.forEach(w=>{
      const mysqlRow = mysqlWeather.find(x=>x.dataValues.identifier==w.identifier)?.dataValues;
      newArr.push({...mysqlRow,id:mysqlRow.identifier, wind: w.wind, rainfall:w.rainfall, humidity: w.humidity, visibility: w.visibility, pressure: w.pressure})
    })

    console.log("newArr", newArr)

    return newArr;
  },
  addWeather: async ({ input }) => {

    const id = uuidv4();

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
      } = input;
      
      const weatherMysqlModel = {
        identifier:id,
        city,
        weather,
        temperature,
        uvIndex,
      };

      const weatherMongoModel = {
        identifier:id,
        wind,
        rainfall,
        humidity,
        visibility,
        pressure,
      };

      console.log("addWeather",weatherMysqlModel, weatherMongoModel)

      await mysqlDb.weather.create(weatherMysqlModel)

      const weatherr = await Weather.create(weatherMongoModel);
      return weatherr.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateWeather: async({id,input})=>{
    await mysqlDb.weather.update(input, {
      where: { identifier: id }
    });
    await Weather.findOneAndUpdate({identifier:id},input);
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

let port = 4001;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});

const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  schema = buildSchema(`
type Weather {
    id:ID
    city:String
    weather:String
    temperature:String
    uvIndex:String
    wind:String
    rainfall:String
    humidity:String
    visibility:String
    pressure:String
}
input weatherInput{
    id:ID
    city:String
    weather:String
    temperature:String
    uvIndex:String
    wind:String
    rainfall:String
    humidity:String
    visibility:String
    pressure:String
}

type Query{
    getAllWeather:[Weather]
    getWeather(id:ID):Weather
}

type Mutation{
    addWeather(input:weatherInput):Weather
    updateWeather(id:ID!, input:weatherInput):Weather


}`);

module.exports = schema;
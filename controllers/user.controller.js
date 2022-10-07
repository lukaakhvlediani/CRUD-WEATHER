const User = require("../models/user.model");

require("dotenv").config();
const signature = process.env.JWT_SECRET;

exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, city, email, date,children, languageLevel, nativeLanguage } =
      req.body;

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      city,
      email,
      date,
      children,
      languageLevel,
      nativeLanguage
    });
    const resultSave = await newUser.save();
    console.log(req.body);
    return res.status(200).send({
      message: "ok",
      data: resultSave,
    });
  } catch (error) {
    console.log(error.message, "catch error createUser");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
    console.log(user, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    return res.status(200).send({
      message: "ok",
      data: user,
    });
  } catch (error) {
    console.log(error.message, "catch error getUser");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

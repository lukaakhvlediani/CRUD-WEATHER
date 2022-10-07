const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

const user_controller = require("../controllers/user.controller");

router.post("/create-user", user_controller.createUser);
router.get("/get-user", user_controller.getUser);

module.exports = router;

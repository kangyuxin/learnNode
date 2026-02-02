const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");

router
  .post("/register", userValidator.register, userController.register)
  .get("/list", userController.list);
module.exports = router;

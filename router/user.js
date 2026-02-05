const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../utils/jwt");

router
  .post("/registers", userValidator.register, userController.register)
  .post("/login", userValidator.login, userController.login)
  .get("/lists", verifyToken, userController.list);
module.exports = router;

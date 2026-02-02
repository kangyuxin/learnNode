const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/test";

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

module.exports = {
  User: mongoose.model("User", require("./userModel")),
};

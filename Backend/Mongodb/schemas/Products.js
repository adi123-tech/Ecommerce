const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Name: String,
  Price: String,
  Category: String,
  userId: String,
  Company: String,
});

module.exports = mongoose.model("products", productSchema);

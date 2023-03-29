const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    collection: "products",
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", ProductSchema);

exports.ProductModel = ProductModel;

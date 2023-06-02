const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 150,
    },
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      //   data: Buffer,
      //   contentType: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Category,
  Product,
};

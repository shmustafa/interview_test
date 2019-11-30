const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

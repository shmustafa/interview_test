const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  product_collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }]
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

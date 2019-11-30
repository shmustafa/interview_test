const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  url: String,
  priority: Number,
  products: [{ type: mongoose.Schema.Types.String, ref: 'Product' }]
},
{ timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;

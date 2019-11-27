const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
},
{ timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;

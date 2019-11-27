const productsDB = require('./schemas/ProductDB');
const collectionsDB = require('./schemas/CollectionDB');

const getAll = () => new Promise((resolve, reject) => {
  productsDB.find({}, 'name', (err, products) => {
    if (err) {
      return reject(err);
    }
    return resolve(products);
  });
});

const getByID = (id) => new Promise((resolve, reject) => {
  productsDB.findOne({ _id: id }, 'name', async (err, product) => {
    if (err) {
      return reject(err);
    }
    product._doc.product_collections = await collectionsDB.find({ products: id }, 'name');
    return resolve(product);
  });
});


const create = (name) => new Promise((resolve, reject) => {
  productsDB.create({ name }, (err, product) => {
    if (err) {
      return reject(err);
    }
    return resolve(product);
  });
});

module.exports = { getAll, getByID, create };

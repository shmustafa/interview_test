const fs = require('fs');
const mongoose = require('mongoose');

const collectionsDB = require('../models/schemas/CollectionDB');
const productsDB = require('../models/schemas/ProductDB');

const productsFilePath = './products.json';
const collectionsPath = './collections.json';

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

function readFile(filePath, perObjJSON = null) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fData) => {
      if (err) {
        reject(err);
      } else {
        const data = JSON.parse(fData);
        if (data && data.length && perObjJSON && perObjJSON.length > 0) {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < perObjJSON.length; j++) {
              data[i][perObjJSON[j]] = JSON.parse(data[i][perObjJSON[j]]);
            }
          }
        }
        return resolve(data);
      }
    });
  });
}

// const resetModel = async () => {
//   collectionsDB.deleteMany({}).exec();
//   productsDB.deleteMany({}).exec();
// };
// resetModel();

const productsData = readFile(productsFilePath, ['product_collections']);
const collectionsData = readFile(collectionsPath);
Promise.all([productsData, collectionsData])
  .then(async (results) => {
    let products = results[0];
    products = products.map((p) => {
      p._id = p.id;
      return p;
    });
    let collections = results[1];
    const collectionCacheHash = {};
    collections = collections.map((c) => {
      c._id = c.id;
      delete c.id;
      c.name = c.collection_name;
      delete c.collection_name;
      collectionCacheHash[c._id] = c;
      collectionCacheHash[c._id].products = new Set();
      return c;
    });
    products = products.map((c) => {
      c._id = c.id;
      //   delete c["id"];
      c.name = c.product_name;
      delete c.product_name;
      const PCs = Object.keys(c.product_collections);
      for (let i = 0; i < PCs.length; i++) {
        const pc = PCs[i];
        collectionCacheHash[pc].url = c.product_collections[pc].url;
        collectionCacheHash[pc].priority = c.product_collections[pc].priority;
        collectionCacheHash[pc].products.add(c._id);
      }
      delete c.product_collections;
      return c;
    });

    collections = collections.map((c) => {
      const temp = collectionCacheHash[c._id].products;
      collectionCacheHash[c._id].products = [...temp];
      return c;
    });

    productsDB
      .create(products)
      .then(() => {
        collectionsDB
          .create(collections)
          .then((x) => {
            console.log(x);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => {
    console.log(e);
  });

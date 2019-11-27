const collectionDB = require('./schemas/CollectionDB');

const getAll = () => new Promise((resolve, reject) => {
  collectionDB.find({}, 'name', (err, collections) => {
    if (err) {
      return reject(err);
    }
    return resolve(collections);
  });
});

const getByID = (id) => new Promise((resolve, reject) => {
  collectionDB.findOne({ _id: id }, 'name', (err, collection) => {
    if (err) {
      return reject(err);
    }
    return resolve(collection);
  });
});

const create = (name) => new Promise((resolve, reject) => {
  collectionDB.create({ name }, (err, collection) => {
    if (err) {
      return reject(err);
    }
    return resolve(collection);
  });
});

module.exports = { getAll, getByID, create };

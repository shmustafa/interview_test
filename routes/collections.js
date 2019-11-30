const express = require('express');

const router = express.Router();

const Collection = require('../models/Collection');
const collectionDB = require('../models/schemas/CollectionDB');

router.get('/', async (req, res) => {
  const collections = await Collection.getAll();
  res.send(collections);
});

// show
router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.getByID(req.params.id);
    res.send(collection);
  } catch (e) {
    res.status(404).send({ error: 'No record found' });
  }
});

// create
router.post('/', async (req, res) => {
  const { name } = req.body;
  collectionDB.create({ name }, (err, collection) => {
    if (err) {
      console.log(err);
      res.send({ error: 'Something went wrong' });
    } else {
      res.send(collection);
    }
  });
});

// update collections
  const { collections } = req.body;
  const collectionKeys = Object.keys(collections);
  // use bulk insert
  const promises = collectionKeys.map((c) => collectionDB
    .updateOne({ _id: c }, { products: collections[c].product_ids })
    .exec());

  Promise.all(promises)
    .then(() => {
      res.send({ status: 'Updated' });
    })
    .catch((e) => {
      res.status(405).send({ error: e.message });
    });
});

// update
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const productIds = req.body.product_ids;
  collectionDB
    .updateOne({ _id: req.params.id }, { name, products: productIds })
    .exec()
    .then((x) => {
      if (x && x.nModified && x.nModified > 0) {
        res.send('Object Updated');
      } else {
        res.status(404).send({ error: 'No record found' });
      }
    })
    .catch((e) => {
      res.status(405).send(e);
    });
});

// delete
router.delete('/:id', async (req, res) => {
  collectionDB
    .deleteOne({ _id: req.params.id })
    .exec()
    .then((x) => {
      if (x && x.deletedCount && x.deletedCount > 0) {
        res.send({ success: true });
      } else {
        res.status(404).send({ error: 'No record found' });
      }
    })
    .catch((err) => {
      res.send({ err });
    });
});

module.exports = router;

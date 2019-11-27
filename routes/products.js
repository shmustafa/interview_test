const express = require('express');

const router = express.Router();

const Product = require('../models/Product');
const productsDB = require('../models/schemas/ProductDB');

// index
router.get('/', async (req, res) => {
  let products = [];
  try {
    products = await Product.getAll();
  } catch (e) {
    console.log(e);
  }
  res.send(products);
});

// show
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.getByID(req.params.id);
    res.send(product);
  } catch (e) {
    res.status(404).send({ error: 'No record found' });
  }
});

// create
router.post('/', async (req, res) => {
  const { name } = req.body;
  const product = await Product.create(name);
  res.send(product);
});

// update
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  productsDB
    .updateOne({ _id: req.params.id }, { name })
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
  productsDB
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

var express = require("express"),
  router = express.Router();

const Product = require("../models/Product");

// index
router.get("/", async function(req, res) {
  let products = await Product.getAll();
  res.send(products);
});

// show
router.get("/:id", async function(req, res) {
  let product = await Product.getByID(req.params.id);
  res.send(product);
});

// create

// update


// delete

module.exports = router;

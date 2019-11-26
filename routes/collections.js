var express = require("express"),
  router = express.Router();

const Collection = require("../models/Collection");

router.get("/", async function(req, res) {
  let collections = await Collection.getAll();
  res.send(collections);
});

// show
router.get("/:id", async function(req, res) {
  let collection = await Collection.getByID(req.params.id);
  res.send(collection);
});

// create
router.post("/", async function(req, res) {
  debugger;
  let collection = await Collection.getByID(req.params.id);
  res.send(collection);
});

// update

// delete

module.exports = router;

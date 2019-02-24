const express = require("express");

const router = express.Router();

router.get("/", require("../controllers/products").getProducts);

module.exports = router;

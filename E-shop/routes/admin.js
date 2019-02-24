const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

const rootDir = require("../util/path");

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post(
  "/add-product",
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    console.log(req.body);
    res.redirect("/");
  }
);

module.exports = router;

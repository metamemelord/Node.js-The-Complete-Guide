const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", { docTitle: "Add product", formsCss: true,  activeAddProduct: true});
});

router.post(
  "/add-product",
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/");
  }
);

module.exports = { router, products };

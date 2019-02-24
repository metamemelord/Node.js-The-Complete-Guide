const router = require("express").Router();
const path = require("path");

const rootDir = require("../util/path");

const { products } = require("./admin");

router.get("/", (req, res) => {
  res.render(path.join("shop"), {
    products,
    docTitle: "Shop",
    hasProducts: products.length > 0,
    productCss: true,
    activeShop: true
  });
  //res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;

const router = require("express").Router();
const Product = require("../model/product.model").Product;

router.route("/").get((req, res) => {
  Product.find({})
    .then((products) => res.send(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:organization").get((req, res) => {
  const organization = req.params.organization;
  Product.find({ organization })
    .then((products) => res.send(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productDescription = req.body.productDescription;
  const organization = req.body.organization;
  const data = {
    productName,
    productPrice,
    productDescription,
    organization,
  };
  Product.create(data)
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

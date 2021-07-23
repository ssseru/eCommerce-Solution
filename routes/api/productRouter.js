const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");
// const data = require("../seeds/seed");
const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

router.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
    });
    const addedProduct = await newProduct.save();
    res
      .status(201)
      .send({ message: "New Product Added", product: addedProduct });
  })
);

router.get("/:id", (req, res) => {
  const product = Product.findById(req.params.id);
  //check condition
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = router;

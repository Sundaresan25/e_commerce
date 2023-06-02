const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const ProductController = require("../controllers/ProductController");
// const authenticate = require('../middleware/authenticate');

router.post("/category/:id", ProductController.addCategory);
router.put("/category/:id", ProductController.updateCategory);
router.get("/category", ProductController.getCategories);
router.delete("/category", ProductController.deleteCategory);

router.post("/product/:id", ProductController.addProducts);
router.put("/product/:id", ProductController.updateCategory);
router.get("/product", ProductController.getProducts);
router.delete("/product", ProductController.deleteProducts);

module.exports = router;

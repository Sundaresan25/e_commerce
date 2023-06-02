const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const authenticate = require("../middleware/authenticate");

router.post("/category/:id", authenticate, ProductController.addCategory);
router.put("/category/:id", authenticate, ProductController.updateCategory);
router.get("/category", authenticate, ProductController.getCategories);
router.delete("/category", authenticate, ProductController.deleteCategory);

router.post("/product/:id", authenticate, ProductController.addProducts);
router.put("/product/:id", authenticate, ProductController.updateCategory);
router.get("/product", authenticate, ProductController.getProducts);
router.delete("/product", authenticate, ProductController.deleteProducts);

module.exports = router;

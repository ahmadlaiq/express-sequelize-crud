const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById
} = require("../controllers/productController");
const {
    uploadOption
} = require("../utils/fileUpload");

router.post("/", uploadOption.single('image'), createProduct)
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
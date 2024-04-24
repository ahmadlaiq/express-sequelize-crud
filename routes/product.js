const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const {
    uploadOption
} = require("../utils/fileUpload");

router.post("/", uploadOption.single('image'), createProduct)
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", uploadOption.single('image'), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
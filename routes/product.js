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
const {
    authMiddleware,
    permissionUser
} = require('../middleware/userMiddleware');

router.post("/", uploadOption.single('image'), authMiddleware, permissionUser("admin"), createProduct)
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", uploadOption.single('image'), authMiddleware, permissionUser("admin"), updateProduct);
router.delete("/:id", authMiddleware, permissionUser("admin"), deleteProduct);

module.exports = router;
const asyncHandle = require('../middleware/asyncHandle');
const {
    Product
} = require("../models");

exports.createProduct = asyncHandle(async (req, res) => {
    let {
        name,
        description,
        price,
        categoryId,
        stock,
    } = req.body;

    const file = req.file;

    if (!file) {
        res.status(400);
        throw new Error("No image uploaded");
    }

    const fileName = file.filename;
    const pathFile = `${req.protocol}://${req.get("host")}/public/uploads/${fileName}`;

    const newProduct = await Product.create({
        name,
        description,
        price,
        categoryId,
        stock,
        image: pathFile
    });

    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        product: newProduct
    });
});

// Route for reading all products
exports.getProducts = asyncHandle(async (req, res) => {
    const products = await Product.findAll();
    return res.status(200).json({
        data: products
    });
});

// Route for getting details of a single product by ID
exports.getProductById = asyncHandle(async (req, res) => {
    const id = req.params.id;
    const productData = await Product.findByPk(id);

    if (!productData) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    return res.status(200).json({
        data: productData
    });
});
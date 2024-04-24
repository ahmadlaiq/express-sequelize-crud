const asyncHandle = require('../middleware/asyncHandle');
const {
    Product
} = require("../models");
const fs = require('fs');

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

// Route for updating a product by ID
exports.updateProduct = asyncHandle(async (req, res) => {
    const id = req.params.id;
    const productData = await Product.findByPk(id);

    if (!productData) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    const {
        name,
        description,
        price,
        categoryId,
        stock,
    } = req.body;

    const file = req.file;

    //hapus file lama jika ada
    if (file) {
        const nameFile = productData.image.replace(`${req.protocol}://${req.get("host")}/public/uploads/`, '');
        const pathFile = `./public/uploads/${nameFile}`;

        fs.unlink(pathFile, (err) => {
            if (err) {
                console.error(err); // Cetak error untuk debug
                return res.status(400).json({
                    error: "Failed to delete image"
                });
            }
            console.log('File deleted successfully');
        });

        const newfileName = file.filename;
        const newpathFile = `${req.protocol}://${req.get("host")}/public/uploads/${newfileName}`;
        productData.image = newpathFile;
    }

    productData.name = name;
    productData.description = description;
    productData.price = price;
    productData.categoryId = categoryId;
    productData.stock = stock;

    await productData.save();

    return res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        product: productData
    });
});

// Route for deleting a product by ID
exports.deleteProduct = asyncHandle(async (req, res) => {
    const id = req.params.id;
    const productData = await Product.findByPk(id);

    if (productData) {
        //hapus file lama jika ada
        const nameFile = productData.image.replace(`${req.protocol}://${req.get("host")}/public/uploads/`, '');
        const pathFile = `./public/uploads/${nameFile}`;

        fs.unlink(pathFile, (err) => {
            if (err) {
                console.error(err); // Cetak error untuk debug
                return res.status(400).json({
                    error: "Failed to delete image"
                });
            }
            console.log('File deleted successfully');
        });

        //destroy product
        await productData.destroy();

        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        });
    } else {
        return res.status(404).json({
            error: "Product not found"
        });
    }

});
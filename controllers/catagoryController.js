const {
    Category
} = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            status: "Success",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        });
    }
};

exports.getCategoryByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
};

exports.storeCategory = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body;
        const category = await Category.create({
            name,
            description
        });
        res.status(201).json({
            status: "success",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
};


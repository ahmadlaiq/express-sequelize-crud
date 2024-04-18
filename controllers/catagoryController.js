const {
    Category
} = require('../models');

exports.getAllCategories = (req, res) => {
    res.status(200).json({
        status: "success",
        data: [{
                "id": "01",
                "name": "Iphone"
            },
            {
                "id": "02",
                "name": "PC"
            },
            {
                "id": "03",
                "name": "Laptop"
            }
        ]
    });
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
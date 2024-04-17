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

exports.storeCategory = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;

    if (!name || !description) {
        return res.status(400).json({
            status: "Fail",
            error: "Validation failed"
        });
    }

    res.status(200).json({
        status: "success",
        message: "Validation successful"
    });
};
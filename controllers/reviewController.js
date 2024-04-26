const asyncHandle = require('../middleware/asyncHandle');
const {
    Review, Product
} = require("../models");
const {Sequelize} = require('sequelize');

const averageDataProduct = async (idProduct) => {
    const resReview = await Review.findOne({
        attributes: [
            [Sequelize.fn('avg', Sequelize.col('point')), 'average'],
        ],
        where: {
            productId: idProduct
        },
    });

    const average = Number(resReview.dataValues.average);

    await Product.update({
        avgReview: average
    }, {
        where: {
            id: idProduct
        }
    });
}

//update or create review
exports.updateOrCreateReview = asyncHandle(async (req, res) => {
    const idUser = req.user.id;
    const idProduct = req.params.productId;

    const {
        point,
        content
    } = req.body;

    let message = "";

    const review = await Review.findOne({
        where: {
            productId: idProduct,
            userId: idUser
        }
    });

    if (review) {
        await Review.update({
            point,
            content
        }, {
            where: {
                productId: idProduct,
                userId: idUser
            }
        });

        await averageDataProduct(idProduct);

        message = "Update review successfully";
    } else {
        await Review.create({
            productId: idProduct,
            userId: idUser,
            point,
            content
        });

        await Product.increment({
            countReview: 1
        },
        {
            where: {
                id: idProduct
            }
        });

        await averageDataProduct(idProduct);

        message = "Create review successfully";
    }

    res.status(200).json({
        message
    });

});
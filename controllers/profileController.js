const asyncHandle = require('../middleware/asyncHandle');
const {
    Profile
} = require("../models");

//update or create profile data for user with userId
exports.updateOrCreateProfile = asyncHandle(async (req, res) => {
    const {
        age,
        bio,
        address,
    } = req.body;

    const idUser = req.user.id;

    const profile = await Profile.findOne({
        where: {
            userId: idUser
        }
    });

    let message = "";

    if (profile) {
        await Profile.update({
            age,
            bio,
            address
        }, {
            where: {
                userId: idUser
            }
        });

        message = "Profile updated successfully";
    } else {
        await Profile.create({
            age,
            bio,
            address,
            userId: idUser
        });

        message = "Profile created successfully";
    }

    res.status(200).json({
        status: "success",
        message: message
    });
});
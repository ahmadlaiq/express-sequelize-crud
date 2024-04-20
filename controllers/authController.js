const {
    User
} = require('../models');

exports.registerUser = async (req, res) => {
    try {
        // Check if password and passwordConfirm match
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({
                message: "Password dan Password Confirm tidak sama"
            });
        }

        // Create a new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(201).json({
            message: "Berhasil Register",
            data: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Gagal Register",
        });
    }
};
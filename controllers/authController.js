const {
    where
} = require('sequelize');
const {
    User
} = require('../models');

const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

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

        // Create a token
        const token = signToken(newUser.id);

        res.status(201).json({
            message: "Berhasil Register",
            data: newUser,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Gagal Register",
        });
    }
};

exports.loginUser = async (req, res) => {
    // Check if email or password is missing
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: "Fail",
            message: "Error: Please provide email and password",
        });
    }

    // Check if user with provided email exists and if password is correct
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return res.status(401).json({
                status: "Fail",
                message: "Error: Invalid email or password",
            });
        }

        // Create a token
        const token = signToken(userData.id);

        return res.status(200).json({
            status: "Success",
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: "Fail",
            message: "Server error during login",
            error: error.message,
        });
    }
};
const {
    User, Profile, Product, Category
} = require('../models');

const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        data: {
            user
        }
    });

}

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
        // Create a token and send it to the user as a response to the registration request
        createSendToken(newUser, 201, res);

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
        // If user exists and password is correct, create a token and send it to the user as a response to the login request
        createSendToken(userData, 200, res);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: "Fail",
            message: "Server error during login",
            error: error.message,
        });
    }
};

exports.logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        message: "Logout Berhasil"
    });
};

exports.getMyUser = async (req, res) => {
    const currentUser = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: Profile,
            attributes: {
                exclude: ["userId", "createdAt", "updatedAt"]
            }
        },
        {
            model: Product,
            as: "historyReview",
            attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId"]
            },
            include: {
                model: Category,
                attributes: ['name']
            }
        }],
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
        }
    });

    if (!currentUser) {
        return res.status(404).json({
            message: "User tidak ditemukan"
        });
    }

    res.status(200).json({
        status: "success",
        data: currentUser
    });
};
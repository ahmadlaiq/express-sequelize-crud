const jwt = require('jsonwebtoken');
const {
    User, Role
} = require('../models');

exports.authMiddleware = async (req, res, next) => {
    let token;
    // Check if token is present in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        token = req.headers.authorization.split(' ')[1];
    }
    // If token is not present in the Authorization header, check the request body
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Anda belum login/register, token tidak ditentukan.',
        });
    }

    // Verify the token
    let decoded;
    try {
        // If token is valid, save the decoded user data to the request object
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        // If token is invalid, return a 401 Unauthorized error
        return res.status(401).json({
            status: 'error',
            message: 'Token tidak valid.',
        });
    }

    //get user by decoded token
    const currentUser = await User.findByPk(decoded.id);
    // If user is not found, return a 401 Unauthorized error
    if (!currentUser) {
        return res.status(401).json({
            status: 'error',
            message: 'User tidak ditemukan.',
        });
    }

    req.user = currentUser;

    // Token is present, continue to the next middleware
    next();
};

exports.permissionUser = (...roles) => {
    return async (req, res, next) => {
        const rolesData = await Role.findByPk(req.user.role_id);

        const roleName = rolesData.name;

        if (!roles.includes(roleName)) {
            return next(res.status(403).json({
                status: 'error',
                message: 'Anda tidak memiliki akses untuk melakukan aksi ini.',
            }));
        }
        next();
    };
};
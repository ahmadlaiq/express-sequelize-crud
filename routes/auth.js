const express = require('express');
const router = express.Router();

const {
    registerUser, loginUser, logoutUser, getMyUser
} = require('../controllers/authController');

const {authMiddleware} = require('../middleware/userMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/me', authMiddleware, getMyUser);

module.exports = router;
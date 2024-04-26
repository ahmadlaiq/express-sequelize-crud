const express = require('express');
const router = express.Router();

const {
    updateOrCreateReview
} = require('../controllers/reviewController');

const {authMiddleware} = require('../middleware/userMiddleware');

router.post('/:productId', authMiddleware, updateOrCreateReview);

module.exports = router;
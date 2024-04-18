const express = require('express');
const router = express.Router();

const {
    getAllCategories, getCategoryByID, storeCategory, updateCategory, deleteCategory
} = require('../controllers/catagoryController');

router.get('/', getAllCategories);

router.get('/:id', getCategoryByID);

router.post('/', storeCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

router.get('/filterData', (req, res) => {
    res.send('Route filter data');
});

router.get('/:nama', (req, res) => {
    res.send(`Ini endpoint dari route params ${req.params.nama}`);
});

module.exports = router;
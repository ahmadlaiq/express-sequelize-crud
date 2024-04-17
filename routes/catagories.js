const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello world");
});

router.post('/', (req, res) => {
    res.send("Response dari method post");
});

router.get('/filterData', (req, res) => {
    res.send('Route filter data');
});

router.get('/:nama', (req, res) => {
    res.send(`Ini endpoint dari route params ${req.params.nama}`);
});

module.exports = router;
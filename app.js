const express = require('express');
const app = express();
const port = 3000;
// Importing routes
const CategoriesRouter = require('./routes/catagories');
const morgan = require('morgan')

// Middleware
app.use(express.json());

// Morgan
app.use(morgan('dev'));

// Routing
app.use('/api/v1/categories', CategoriesRouter);

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
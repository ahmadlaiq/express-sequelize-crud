const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const CategoriesRouter = require('./routes/catagories');
const AuthRouter = require('./routes/auth');
const ProductRouter = require('./routes/product');
const ProfileRouter = require('./routes/profile');
const morgan = require('morgan');
const {errorHandler, notFound} = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // Logging middleware
app.use(cors()); // Enable CORS
app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads'))); // Serve static files

// Routing
app.use('/api/v1/categories', CategoriesRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/profiles', ProfileRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Server
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
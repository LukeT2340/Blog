// Required libraries
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const adminController = require('./routers/adminRoutes');
const blogController = require('./routers/blogRoutes');

require('dotenv').config();

// Define app
const app = express();

// Use cors
app.use(cors());

// Use cookie parser
app.use(cookieParser());

// Use admin routes
app.use('/admin', adminController);

// Use blog routes
app.use('/blog', blogController);

// Start listening
const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken');
const requireAuth = require('../middleware/requireAuth');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Creates token
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d'});
};

// Handle admin login requests
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find admin by email
        const admin = await Admin.findOne({ where: { username: username } });
        if (!admin) {
            return res.status(400).json({ errorMessage: 'Invalid username or password.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.hashed_password);
        if (!isPasswordValid) {
            return res.status(400).json({ errorMessage: 'Invalid username or password.' });
        }

        // Create JWT token
        const token = createToken(admin.id);
        console.log(`Admin "${admin.name}" logged in to your site.`)
        res.status(200).json({ user_id: admin.id, username: admin.username, token: token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ errorMessage: 'Internal server error.' });
    }
});

router.use(requireAuth);

router.post('/postBlog', async (req, res) => {
    try {
        const blog = req.body.formData;
        const { title, content, styles, category, tags, thumbnail } = blog;
        const authorId = req.body.authorId;
        // Validate the required fields
        if (!title || !content || !styles || !authorId || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const author = await Admin.findOne({ where: {id: authorId}});
        if (!author) {
            return res.status(400).json({ error: 'Author not found' });
        }

        // Assuming you have a database model for blogs
        const newBlog = new Blog({
            title: title, 
            content,
            styles,
            author: author.name,
            category,
            tags,
            thumbnail
        });

        // Save the blog to the database
        await newBlog.save();

        // Respond with success message
        return res.status(201).json({ message: 'Blog posted successfully', blog: newBlog });
    } catch (error) {
        console.error('Error posting blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;

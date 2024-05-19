// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const Blog = require('../models/Blog')

const requireAuth = require('../middleware/requireAuth');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Retrieve a blog based on blog id
router.get('/getOne', async (req, res) => {
    const blogTitle = req.query.blogTitle.replace(/-/g, ' '); // This is the title from the URL. So replace all '-' with spaces

    try {
        if (!blogTitle) {
            return res.status(400).json({ error: 'Blog title is required' });
        }

        const blog = await Blog.findOne({
            where: { title: blogTitle }
        });

        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        return res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});


// Retrieve blogs based on category
router.get('/getMany', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: ['id', 'title', 'createdAt', 'description', 'thumbnail', 'tags'],
            order: [['createdAt', 'DESC']] 
        });
        

        if (blogs.length === 0) { 
            return res.status(404).json({ message: 'No blogs found.' });
        }

        return res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
});


module.exports = router;

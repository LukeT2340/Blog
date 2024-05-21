// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const { Sequelize } = require('sequelize'); 
const { Op } = require('sequelize');

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
        // Log user's IP address to console
        const ipAddress = req.ip;
        console.log('User IP:', ipAddress);

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


// Search blogs
router.get('/search', async (req, res) => {
    try {
        const searchText = req.query.searchText;
        // Check if search text is provided
        if (!searchText) {
            return res.status(400).json({ error: 'Search text is required' });
        }

        // Perform case-insensitive search using Sequelize's "like" operator and MySQL's "LOWER" function
        const blogs = await Blog.findAll({
            where: {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${searchText.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${searchText.toLowerCase()}%`)
                ]
            },
            attributes: ['id', 'title', 'createdAt', 'description', 'thumbnail', 'tags'],
            order: [['createdAt', 'DESC']]
        });

        // Return the matching blogs
        return res.status(200).json(blogs);
    } catch (error) {
        console.error('Error searching blogs:', error);
        return res.status(500).json({ error: 'Failed to search for blog posts' });
    }
});

// Endpoints under this require authentication
router.use(requireAuth);

// Delete blog
router.post('/delete', async (req, res) => {
    const blogId = req.body.blogId;

    // Make sure blog id was provided
    if (!blogId) {
        return res.status(400).json({ message: "No blog id provided"});
    }

    try {
        const result = Blog.destroy({ where: {
            id: blogId
        }})

        if (!result) {
            return res.status(400).json({ message: "Failed to delete blog post"});
        }

        return res.status(200).json({ message: "Blog post destroyed"});
    } catch (error) {
        return res.status(400).json({ message: "Failed to delete blog post"});
    }
})

// Update existing blog post
router.post('/update', async (req, res) => {
    const updatedBlog = req.body.formData
    const { id, title, content, styles, category, tags, thumbnail, description, authorId } = updatedBlog;

    try {
        const existingBlog = await Blog.findOne({ where: {
            id: id
        }})

        if (!existingBlog) {
            return res.status(400).json({ message: "Failed to find existing blog post"});
        }

        existingBlog.title = title;
        existingBlog.content = content;
        existingBlog.styles = styles;
        existingBlog.category = category;
        existingBlog.tags = tags;
        existingBlog.thumbnail = thumbnail;
        existingBlog.description = description;

        existingBlog.save();

        return res.status(200).json({ message: "Blog post updated"});
    } catch (error) {
        return res.status(400).json({ message: "Failed to update blog post"});
    }
})

router.post('/postBlog', async (req, res) => {
    try {
        const blog = req.body.formData;
        const { title, content, styles, category, tags, thumbnail, description } = blog;
        const authorId = req.body.authorId;
        // Validate the required fields
        if (!title || !content || !styles || !authorId || !category || !description || !tags) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const author = await Admin.findOne({ where: {id: authorId}});
        if (!author) {
            return res.status(400).json({ error: 'Author not found' });
        }

        const newBlog = new Blog({
            title: title, 
            content,
            styles,
            author: author.name,
            category,
            tags,
            thumbnail,
            description
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

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Require this middleware on routes where user should be authenticated when accessing
const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Get token from header
    const token = authorization.split(' ')[1];

    // Try to retrieve user from db then attach id to request
    try {
        const {id} = jwt.verify(token, process.env.SECRET);
        admin = await Admin.findOne({ where: { id: id } });
        req.adminId = admin.id;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized '});
    }
};

module.exports = requireAuth;
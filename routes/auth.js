const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = req.app.locals.db;

    try {
        // Get user from database
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Create and sign JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Change password route
router.post('/change-password', verifyToken, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const db = req.app.locals.db;

    try {
        // Get user from database
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

        // Check current password
        const validPassword = bcrypt.compareSync(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Current password is incorrect.' });
        }

        // Hash new password and update
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        db.prepare('UPDATE users SET password = ? WHERE id = ?')
            .run(hashedPassword, req.user.id);

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Verify token route
router.get('/verify', verifyToken, (req, res) => {
    res.json({ valid: true });
});

module.exports = router;
module.exports.verifyToken = verifyToken;
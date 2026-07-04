require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Create data directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize database
const db = new Database(path.join(__dirname, 'data', 'tribesman.db'));

// Create tables and insert sample data
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT,
        category_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    );
`);

// Insert default admin user if not exists
const adminUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminUser) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        .run('admin', hashedPassword);
}

// Insert sample categories if not exists
const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get();
if (existingCategories.count === 0) {
    const sampleCategories = [
        ['Casual Wear', 'Comfortable everyday clothing'],
        ['Formal Wear', 'Elegant business and special occasion attire'],
        ['Streetwear', 'Urban and contemporary fashion']
    ];

    const insertCategory = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)');
    sampleCategories.forEach(category => insertCategory.run(category[0], category[1]));
}

// Insert sample products if not exists
const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (existingProducts.count === 0) {
    const sampleProducts = [
        ['Classic T-Shirt', 'Premium cotton basic tee', 29.99, 1],
        ['Business Suit', 'Two-piece wool blend suit', 299.99, 2],
        ['Urban Hoodie', 'Oversized street style hoodie', 59.99, 3],
        ['Denim Jacket', 'Vintage wash denim jacket', 79.99, 1],
        ['Evening Dress', 'Elegant black cocktail dress', 149.99, 2],
        ['Cargo Pants', 'Multi-pocket street style pants', 69.99, 3]
    ];

    const insertProduct = db.prepare('INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)');
    sampleProducts.forEach(product => insertProduct.run(product[0], product[1], product[2], product[3]));
}

// Attach database to app
app.locals.db = db;

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle process termination
process.on('SIGINT', () => {
    db.close();
    process.exit(0);
});
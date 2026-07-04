const express = require('express');
const router = express.Router();
const verifyToken = require('../routes/auth').verifyToken;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File is too large. Maximum size is ' + (parseInt(process.env.MAX_FILE_SIZE) / (1024 * 1024)) + 'MB' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};

// Get all products with category names
router.get('/', (req, res) => {
    const db = req.app.locals.db;
    try {
        console.log('Fetching all products...');
        const stmt = db.prepare(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `);
        const products = stmt.all();
        console.log('Products fetched:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Get single product
router.get('/:id', (req, res) => {
    const db = req.app.locals.db;
    try {
        console.log('Fetching product with ID:', req.params.id);
        const product = db.prepare(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `).get(req.params.id);

        if (!product) {
            console.log('Product not found with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found.' });
        }

        console.log('Product found:', product);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Create new product
router.post('/', verifyToken, upload.single('image'), handleMulterError, (req, res) => {
    const { name, description, price, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const db = req.app.locals.db;

    try {
        if (!name || !description || !price || !category_id) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        console.log('Creating new product:', { name, description, price, category_id, image });
        const result = db.prepare(
            'INSERT INTO products (name, description, price, image, category_id) VALUES (?, ?, ?, ?, ?)'
        ).run(name, description, price, image, category_id);

        if (result.changes > 0) {
            const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
            console.log('Product created successfully:', newProduct);
            res.status(201).json(newProduct);
        } else {
            console.log('Failed to create product');
            res.status(400).json({ error: 'Failed to create product.' });
        }
    } catch (error) {
        console.error('Error creating product:', error);
        if (req.file) {
            fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
                if (err) console.error('Error deleting uploaded file:', err);
            });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Update product
router.put('/:id', verifyToken, upload.single('image'), handleMulterError, (req, res) => {
    const { name, description, price, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const db = req.app.locals.db;

    try {
        if (!name || !description || !price || !category_id) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        console.log('Updating product with ID:', req.params.id);
        // Get current product to check if image needs to be deleted
        const currentProduct = db.prepare('SELECT image FROM products WHERE id = ?').get(req.params.id);
        
        if (!currentProduct) {
            console.log('Product not found for update with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found.' });
        }

        let updateQuery = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?';
        let params = [name, description, price, category_id];

        if (image) {
            updateQuery += ', image = ?';
            params.push(image);

            // Delete old image if it exists
            if (currentProduct.image) {
                const oldImagePath = path.join(uploadsDir, currentProduct.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        updateQuery += ' WHERE id = ?';
        params.push(req.params.id);

        const result = db.prepare(updateQuery).run(...params);

        if (result.changes > 0) {
            const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
            console.log('Product updated successfully:', updatedProduct);
            res.json(updatedProduct);
        } else {
            console.log('Failed to update product');
            res.status(400).json({ error: 'Failed to update product.' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        if (req.file) {
            fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
                if (err) console.error('Error deleting uploaded file:', err);
            });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Delete product
router.delete('/:id', verifyToken, (req, res) => {
    const db = req.app.locals.db;

    try {
        console.log('Deleting product with ID:', req.params.id);
        // Get current product to delete image
        const product = db.prepare('SELECT image FROM products WHERE id = ?').get(req.params.id);
        
        if (!product) {
            console.log('Product not found for deletion with ID:', req.params.id);
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Delete the product from database
        const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);

        if (result.changes > 0) {
            // Delete product image if it exists
            if (product.image) {
                const imagePath = path.join(uploadsDir, product.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            console.log('Product deleted successfully');
            res.json({ message: 'Product deleted successfully.' });
        } else {
            console.log('Failed to delete product');
            res.status(400).json({ error: 'Failed to delete product.' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
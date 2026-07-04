const express = require('express');
const router = express.Router();
const verifyToken = require('../routes/auth').verifyToken;

// Get all categories
router.get('/', (req, res) => {
    const db = req.app.locals.db;
    try {
        const categories = db.prepare('SELECT * FROM categories').all();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Get single category with its products
router.get('/:id', (req, res) => {
    const db = req.app.locals.db;
    try {
        const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        const products = db.prepare('SELECT * FROM products WHERE category_id = ?').all(req.params.id);
        category.products = products;

        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Create new category
router.post('/', verifyToken, (req, res) => {
    const { name, description } = req.body;
    const db = req.app.locals.db;

    try {
        const result = db.prepare(
            'INSERT INTO categories (name, description) VALUES (?, ?)'
        ).run(name, description);

        if (result.changes > 0) {
            const newCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);
            res.status(201).json(newCategory);
        } else {
            res.status(400).json({ error: 'Failed to create category.' });
        }
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Update category
router.put('/:id', verifyToken, (req, res) => {
    const { name, description } = req.body;
    const db = req.app.locals.db;

    try {
        const result = db.prepare(
            'UPDATE categories SET name = ?, description = ? WHERE id = ?'
        ).run(name, description, req.params.id);

        if (result.changes > 0) {
            const updatedCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
            res.json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Category not found.' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Delete category
router.delete('/:id', verifyToken, (req, res) => {
    const db = req.app.locals.db;

    try {
        // Check if category exists
        const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        // Check if category has products
        const products = db.prepare('SELECT COUNT(*) as count FROM products WHERE category_id = ?').get(req.params.id);
        
        if (products.count > 0) {
            return res.status(400).json({ 
                error: 'Cannot delete category with associated products. Please remove or reassign products first.' 
            });
        }

        // Delete the category
        const result = db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);

        if (result.changes > 0) {
            res.json({ message: 'Category deleted successfully.' });
        } else {
            res.status(400).json({ error: 'Failed to delete category.' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
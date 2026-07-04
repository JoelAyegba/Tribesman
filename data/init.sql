-- Create tables
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

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (username, password) VALUES
('admin', '$2a$10$rQnpe.UJm3UwGz0E8DOZi.43UVx4.1DMZ9q5v9.2kqTxd3.QXdz1K');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Casual Wear', 'Comfortable everyday clothing'),
('Formal Wear', 'Elegant business and special occasion attire'),
('Streetwear', 'Urban and contemporary fashion');

-- Insert sample products
INSERT INTO products (name, description, price, category_id) VALUES
('Classic T-Shirt', 'Premium cotton basic tee', 29.99, 1),
('Business Suit', 'Two-piece wool blend suit', 299.99, 2),
('Urban Hoodie', 'Oversized street style hoodie', 59.99, 3),
('Denim Jacket', 'Vintage wash denim jacket', 79.99, 1),
('Evening Dress', 'Elegant black cocktail dress', 149.99, 2),
('Cargo Pants', 'Multi-pocket street style pants', 69.99, 3);
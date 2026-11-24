-- CH5-3 · Example: shop system with 5 tables (users, categories, products, orders, order_items)
-- Run in HeidiSQL (File → Run SQL file) or:  mysql -u root -p < schema.sql
CREATE DATABASE IF NOT EXISTS shop
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop;

DROP TABLE IF EXISTS order_items, orders, products, categories, users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('member', 'admin') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending', 'paid', 'shipped') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  qty INT NOT NULL CHECK (qty > 0),
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- sample data
INSERT INTO categories (name) VALUES ('Stationery'), ('Books'), ('Bags');
INSERT INTO products (category_id, name, price, stock) VALUES
  (1, 'Pen', 15.00, 100),
  (1, 'Pencil', 8.00, 200),
  (1, 'Notebook', 45.00, 30),
  (2, 'Web Book', 250.00, 20),
  (3, 'Canvas Bag', 590.00, 5);
-- password_hash here is a placeholder; real hashes come from bcrypt in CH8
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Somchai', 'somchai@example.com', 'not-a-real-hash', 'member'),
  ('Admin', 'admin@example.com', 'not-a-real-hash', 'admin');
INSERT INTO orders (user_id, status) VALUES (1, 'paid');
INSERT INTO order_items (order_id, product_id, qty, price) VALUES (1, 1, 2, 15.00), (1, 4, 1, 250.00);

-- try these queries (SQL CRUD slides)
-- SELECT id, name, price FROM products WHERE price < 100 ORDER BY price DESC LIMIT 10 OFFSET 0;
-- SELECT p.name, c.name AS category FROM products p JOIN categories c ON c.id = p.category_id;
-- UPDATE products SET price = 18.00, stock = stock - 1 WHERE id = 1;
-- DELETE FROM categories WHERE id = 1;   -- error 1451: the FK protects products

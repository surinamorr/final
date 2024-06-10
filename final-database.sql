CREATE DATABASE nuova;
USE nuova;
-- DROP DATABASE nuova;

CREATE TABLE starters (
    starter_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE mains (
    main_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE desserts (
    dessert_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE sides (
    side_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_date DATE,
    total_price decimal(10,2),
    FOREIGN KEY (user_id) REFERENCES user_login(id)
);
CREATE TABLE order_details (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    item_type ENUM('starter', 'main', 'dessert', 'side') NOT NULL,
    item_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
CREATE TABLE admin_login (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255)
);
-- Drop Table order_details

INSERT INTO starters (name, price) VALUES
  ('Calamari Fritti', 12.99),
  ('Bruschetta', 8.50),
  ('French Onion Soup', 7.95),
  ('Chicken Wings', 10.50),
  ('Shrimp Cocktail', 14.99),
  ('Spinach Artichoke Dip', 9.75),
  ('Nachos', 11.25),
  ('Potato Skins', 8.25),
  ('Onion Rings', 7.00),
  ('Garlic Bread', 5.50);
INSERT INTO mains (name, price) VALUES
  ('New York Strip Steak', 24.99),
  ('Chicken Parmigiana', 18.75),
  ('Salmon with Lemon Dill Sauce', 22.50),
  ('Penne Pasta Primavera', 16.99),
  ('Lasagna', 17.25),
  ('Burger with Fries', 14.50),
  ('BBQ Ribs', 21.99),
  ('Chicken Alfredo', 15.75),
  ('Shrimp Scampi', 19.95),
  ('Vegetarian Chili', 13.25);
  
INSERT INTO desserts (name, price) VALUES
  ('Chocolate Cake', 7.00),
  ('Cheesecake', 6.50),
  ('Apple Pie', 5.75),
  ('New York-Style Cheesecake', 7.50),
  ('Tiramisu', 8.25),
  ('Chocolate Lava Cake', 6.75),
  ('Brownie Sundae', 8.99),
  ('Ice Cream (Single Scoop)', 3.50),
  ('Ice Cream (Double Scoop)', 5.00),
  ('Fruit Salad', 4.75);
  
INSERT INTO sides (name, price) VALUES
  ('French Fries', 3.50),
  ('Mashed Potatoes', 4.00),
  ('Steamed Vegetables', 4.25),
  ('Onion Rings', 3.75),
  ('Garlic Bread', 3.00),
  ('Caesar Salad', 5.25),
  ('House Salad', 4.75),
  ('Coleslaw', 2.75),
  ('Mac and Cheese', 4.50),
  ('Rice Pilaf', 3.25);
  
INSERT INTO customers (first_name, last_name, email) VALUES
  ('John', 'Smith', 'john.smith@email.com'),
  ('Jane', 'Doe', 'jane.doe@email.com'),
  ('Michael', 'Brown', 'michael.brown@email.com'),
  ('Sarah', 'Jones', 'sarah.jones@email.com'),
  ('David', 'Miller', 'david.miller@email.com'),
  ('Lisa', 'Garcia', 'lisa.garcia@email.com'),
  ('Jennifer', 'Williams', 'jennifer.williams@email.com'),
  ('Matthew', 'Davis', 'matthew.davis@email.com'),
  ('Ashley', 'Rodriguez', 'ashley.rodriguez@email.com'),
  ('Brandon', 'Wilson', 'brandon.wilson@email.com');
  
INSERT INTO orders (user_id, order_date, total_price) VALUES 
  (1, '2023-01-01', 150.00),  -- Order 1
  (2, '2023-01-02', 200.00),  -- Order 2
  (3, '2023-01-03', 250.00),  -- Order 3
  (4, '2023-01-04', 300.00),  -- Order 4
  (5, '2023-01-05', 350.00),  -- Order 5
  (6, '2023-01-06', 400.00),  -- Order 6
  (7, '2023-01-07', 450.00),  -- Order 7
  (8, '2023-01-08', 500.00),  -- Order 8
  (9, '2023-01-09', 550.00),  -- Order 9
  (10, '2023-01-10', 600.00); -- Order 10

INSERT INTO order_details (order_id, item_type, item_id, quantity, price)
-- Order Details referencing Starters
	SELECT 1, 'starter', 1, 10, (SELECT price FROM starters WHERE starter_id = 1)  -- Order 1, Starter with ID 1, quantity 10
UNION ALL
	SELECT 2, 'starter', 2, 20, (SELECT price FROM starters WHERE starter_id = 2)  -- Order 2, Starter with ID 2, quantity 20
UNION ALL
	SELECT 3, 'starter', 3, 30, (SELECT price FROM starters WHERE starter_id = 3)  -- Order 3, Starter with ID 3, quantity 30
UNION ALL
	SELECT 4, 'starter', 4, 25, (SELECT price FROM starters WHERE starter_id = 4)  -- Order 4, Starter with ID 4, quantity 25
UNION ALL
	SELECT 5, 'starter', 5, 15, (SELECT price FROM starters WHERE starter_id = 5)  -- Order 5, Starter with ID 5, quantity 15
UNION ALL
	SELECT 6, 'starter', 6, 10, (SELECT price FROM starters WHERE starter_id = 6)  -- Order 6, Starter with ID 6, quantity 10
UNION ALL
	SELECT 7, 'starter', 7, 20, (SELECT price FROM starters WHERE starter_id = 7)  -- Order 7, Starter with ID 7, quantity 20
UNION ALL
	SELECT 8, 'starter', 8, 35, (SELECT price FROM starters WHERE starter_id = 8)  -- Order 8, Starter with ID 8, quantity 35
UNION ALL
	SELECT 9, 'starter', 9, 25, (SELECT price FROM starters WHERE starter_id = 9)  -- Order 9, Starter with ID 9, quantity 25
UNION ALL
	SELECT 10, 'starter', 10, 30, (SELECT price FROM starters WHERE starter_id = 10)  -- Order 10, Starter with ID 10, quantity 30

-- Order Details referencing Mains
UNION ALL
	SELECT 1, 'main', 1, 10, (SELECT price FROM mains WHERE main_id = 1)  -- Order 1, Main with ID 1, quantity 10
UNION ALL
	SELECT 2, 'main', 2, 20, (SELECT price FROM mains WHERE main_id = 2)  -- Order 2, Main with ID 2, quantity 20
UNION ALL
	SELECT 3, 'main', 3, 30, (SELECT price FROM mains WHERE main_id = 3)  -- Order 3, Main with ID 3, quantity 30
UNION ALL
	SELECT 4, 'main', 4, 25, (SELECT price FROM mains WHERE main_id = 4)  -- Order 4, Main with ID 4, quantity 25
UNION ALL
	SELECT 5, 'main', 5, 15, (SELECT price FROM mains WHERE main_id = 5)  -- Order 5, Main with ID 5, quantity 15
UNION ALL
	SELECT 6, 'main', 6, 10, (SELECT price FROM mains WHERE main_id = 6)  -- Order 6, Main with ID 6, quantity 10
UNION ALL
	SELECT 7, 'main', 7, 20, (SELECT price FROM mains WHERE main_id = 7)  -- Order 7, Main with ID 7, quantity 20
UNION ALL
	SELECT 8, 'main', 8, 35, (SELECT price FROM mains WHERE main_id = 8)  -- Order 8, Main with ID 8, quantity 35
UNION ALL
	SELECT 9, 'main', 9, 25, (SELECT price FROM mains WHERE main_id = 9)  -- Order 9, Main with ID 9, quantity 25
UNION ALL
	SELECT 10, 'main', 10, 30, (SELECT price FROM mains WHERE main_id = 10)  -- Order 10, Main with ID 10, quantity 30

-- Order Details referencing Desserts
UNION ALL
	SELECT 1, 'dessert', 1, 10, (SELECT price FROM desserts WHERE dessert_id = 1)  -- Order 1, Dessert with ID 1, quantity 10
UNION ALL
	SELECT 2, 'dessert', 2, 20, (SELECT price FROM desserts WHERE dessert_id = 2)  -- Order 2, Dessert with ID 2, quantity 20
UNION ALL
	SELECT 3, 'dessert', 3, 30, (SELECT price FROM desserts WHERE dessert_id = 3)  -- Order 3, Dessert with ID 3, quantity 30
UNION ALL
	SELECT 4, 'dessert', 4, 25, (SELECT price FROM desserts WHERE dessert_id = 4)  -- Order 4, Dessert with ID 4, quantity 25
UNION ALL
	SELECT 5, 'dessert', 5, 15, (SELECT price FROM desserts WHERE dessert_id = 5)  -- Order 5, Dessert with ID 5, quantity 15
UNION ALL
	SELECT 6, 'dessert', 6, 10, (SELECT price FROM desserts WHERE dessert_id = 6)  -- Order 6, Dessert with ID 6, quantity 10
UNION ALL
	SELECT 7, 'dessert', 7, 20, (SELECT price FROM desserts WHERE dessert_id = 7)  -- Order 7, Dessert with ID 7, quantity 20
UNION ALL
	SELECT 8, 'dessert', 8, 35, (SELECT price FROM desserts WHERE dessert_id = 8)  -- Order 8, Dessert with ID 8, quantity 35
UNION ALL
	SELECT 9, 'dessert', 9, 25, (SELECT price FROM desserts WHERE dessert_id = 9)  -- Order 9, Dessert with ID 9, quantity 25
UNION ALL
	SELECT 10, 'dessert', 10, 30, (SELECT price FROM desserts WHERE dessert_id = 10)  -- Order 10, Dessert with ID 10, quantity 30

-- Order Details referencing Sides
UNION ALL
	SELECT 1, 'side', 1, 10, (SELECT price FROM sides WHERE side_id = 1)  -- Order 1, Side with ID 1, quantity 10
UNION ALL
	SELECT 2, 'side', 2, 20, (SELECT price FROM sides WHERE side_id = 2)  -- Order 2, Side with ID 2, quantity 20
UNION ALL
	SELECT 3, 'side', 3, 30, (SELECT price FROM sides WHERE side_id = 3)  -- Order 3, Side with ID 3, quantity 30
UNION ALL
	SELECT 4, 'side', 4, 25, (SELECT price FROM sides WHERE side_id = 4)  -- Order 4, Side with ID 4, quantity 25
UNION ALL
	SELECT 5, 'side', 5, 15, (SELECT price FROM sides WHERE side_id = 5)  -- Order 5, Side with ID 5, quantity 15
UNION ALL
	SELECT 6, 'side', 6, 10, (SELECT price FROM sides WHERE side_id = 6)  -- Order 6, Side with ID 6, quantity 10
UNION ALL
	SELECT 7, 'side', 7, 20, (SELECT price FROM sides WHERE side_id = 7)  -- Order 7, Side with ID 7, quantity 20
UNION ALL
	SELECT 8, 'side', 8, 35, (SELECT price FROM sides WHERE side_id = 8)  -- Order 8, Side with ID 8, quantity 35
UNION ALL
	SELECT 9, 'side', 9, 25, (SELECT price FROM sides WHERE side_id = 9)  -- Order 9, Dessert with ID 9, quantity 25
UNION ALL
	SELECT 10, 'side', 10, 30, (SELECT price FROM sides WHERE side_id = 10);  -- Order 10, Dessert with ID 10, quantity 30;



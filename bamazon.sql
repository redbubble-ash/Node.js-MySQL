DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)

)

SELECT *
FROM products;

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (1, "Laptop", "Electronics", 980.89, 150),
    (2, "Electric Shaver", "Electronics", 98.99, 450),
    (3, "Pet Fountain", "Pet", 26.55, 200),
    (4, "Doorbell", "Home", 150.00, 50),
    (5, "Wall Clock", "Electronics", 29.99, 100),
    (6, "Coffee Maker", "Home", 163.00, 50),
    (7, "Travel Backpac", "Outdoor Recreation", 88.89, 200),
    (8, "Dog Toy", "Pet", 25.60, 300),
    (9, "Bike", "Outdoor Recreation", 449.99, 20),
    (10, "Waterproof Rain Jacket", "Outdoor Recreation", 59.96, 100),
    (11, "Bed Pillow", "Home", 45.45, 150),
    (12, "Dinnerware set", "Home", 119.99, 50),
    (13, "Slow Cooker", "Home", 45.55, 60),
    (14, "Toaster", "Home", 35.65, 80),
    (15, "MP3/MP4 Player", "Electronics", 18.79, 50),
    (16, "Headset", "Electronics", 229.99, 30),
    (17, "Bird Cage", "Pet", 150.55, 30),
    (18, "Dog Carrier", "Pet", 56.64, 65),
    (19, "Bath Towel Set", "Home", 44.99, 150),
    (20, "Hiking Shoes", "Outdoor Recreation", 78.85, 50);



CREATE TABLE departments
(

    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)

)

-- add a column "product_sale" on the product table, * default as 0 when new product is entered

ALTER TABLE products
ADD product_sales DECIMAL(10,2) NULL DEFAULT 0;;

INSERT INTO departments
    (department_name, over_head_costs)
VALUES
 ("Electronics", 2000),
 ("Pet", 1000),
 ("Home", 1500),
 ("Outdoor Recreation",1200);


-- Using JOINS to join two table, aliases to create a temp column head & GROUP BY to sort by each department

SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP  BY department_name;
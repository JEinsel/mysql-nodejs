DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
price DECIMAL(6,2) NULL,
quantity INTEGER NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (name, department, price, quantity) VALUES ("Futon", "Furniture", 250.00, 50);

INSERT INTO products (name, department, price, quantity) VALUES ("Lamp", "Furniture", 60.00, 25);

INSERT INTO products (name, department, price, quantity) VALUES ("Sewing Machine", "Crafts", 100.00, 80);

INSERT INTO products (name, department, price, quantity) VALUES ("Planter", "Garden", 25.00, 50);

INSERT INTO products (name, department, price, quantity) VALUES ("Fabric", "Crafts", 5.00, 15);

INSERT INTO products (name, department, price, quantity) VALUES ("Dresser", "Furniture", 125.00, 7);

INSERT INTO products (name, department, price, quantity) VALUES ("Desk Chair", "Chairs", 250.00, 3);

INSERT INTO products (name, department, price, quantity) VALUES ("Dining Table", "Furniture", 300.00, 1);

INSERT INTO products (name, department, price, quantity) VALUES ("Coffee Maker", "Kitchen", 40.00, 5);

INSERT INTO products (name, department, price, quantity) VALUES ("Knife Set", "Kitchen", 200.00, 5);

INSERT INTO products (name, department, price, quantity) VALUES ("Leash", "Pets", 4.50, 0);

SELECT * FROM products;
DROP DATABASE IF EXISTS store;

CREATE DATABASE store;

USE store;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO  products (name, department, price, quantity)
VALUES ("ipod", "electronics", 200, 25), ("laptop", "electronics", 700, 15), ("tv", "electronics", 1000, 20), ("steak", "food", 10, 10);

INSERT INTO  products (name, department, price, quantity)
VALUES ("carrots", "food", 3, 200), ("apple", "food", 5, 100), ("cookies", "food", 15, 300), ("hoodie", "clothes", 50, 50), ("jeans", "clothes", 30, 10), ("jacket", "clothes", 70, 200);

select * from products;
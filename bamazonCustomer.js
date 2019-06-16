require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");


var con = mysql.createConnection({
host: "localhost",
port: 3306,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE_NAME
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES?";
    var VALUES = [
        [1, "Laptop", "Electronics", 980.89, 150],
        [2, "Electric Shaver","Electronics", 98.99, 450],
        [3, "Pet Fountain", "Pet", 26.55, 200],
        [4, "Doorbell", "Home", 150.00, 50],
        [5, "Wall Clock", "Electronics", 29.99, 100],
        [6, "Coffee Maker", "Home", 163.00, 50],
        [7, "Travel Backpac", "Outdoor Recreation", 88.89, 200],
        [8, "Dog Toy", "Pet", 25.60, 300],
        [9, "Bike", "Outdoor Recreation", 449.99, 20],
        [10, "Waterproof Rain Jacket", "Outdoor Recration", 59.96, 100],
        [11, "Bed Pillow", "Home", 45.45, 150],
        [12, "Dinnerware set", "Home", 119.99, 50],
        [13, "Slow Cooker", "Home", 45.55, 60],
        [14, "Toaster", 35.65, 80],
        [15, "MP3/MP4 Player","Electronics",18.79, 50],
        [16, "Headset", "Electronics", 229.99, 30],
        [17, "Bird Cage", "Pet", 150.55, 30],
        [18, "Dog Carrier", "Pet", 56.64, 65 ],
        [19, "Bath Towel Set", "Home", 44.99, 150],
        [20, "Hiking Shoes", "Outdoor Recration", 78.85, 50]

    ]

    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log(rows[0]);
      });
  });
  
  connection.end();
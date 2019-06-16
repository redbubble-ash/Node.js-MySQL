require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');



var con = mysql.createConnection({
host: "localhost",
port: 3306,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE_NAME
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT item_id, product_name, price FROM products", function(err, result, fields){
    if (err) throw err;
    console.log("Products are available to sale:\n"+cTable.getTable(result))

    });
  });
  
  
//   con.end();
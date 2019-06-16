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


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
//   con.end();
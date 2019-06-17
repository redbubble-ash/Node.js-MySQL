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
        runSearch();
    });
    
    function runSearch(){
        inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product",
            ]
          })    
          .then(function(answer) {
            switch (answer.action) {
            case "View Products for Sale":
              saleSearch();
              break;
      
            case "View Low Inventory":
              lowInvSearch();
              break;
      
            case "Add to Inventory":
              addInv();
              break;
      
            case "Add New Product":
              addPro();
              break;
            }

          });
    }
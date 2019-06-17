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
    // console.log("Connected!");
    // console.log("connected as id " + con.threadId + "\n");
    con.query("SELECT item_id, product_name, price FROM products", function(err, result, fields){
    if (err) throw err;
    console.log("\nProducts are available to sale:\n"+cTable.getTable(result))

    });
    runSearch();
  });

  function runSearch(){
      inquirer
      .prompt({
          name: "productId",
          type: "input",
          message: "Which product would you like to buy? Please enter product ID."

      })
      .then(function(answer){
          var query = "SELECT price, stock_quantity FROM products WHERE ?";
          con.query(query, {item_id: answer.productId }, function(err, res){
              if (err) throw err;
              console.log(res[0].price);
          })
      })
  }
  
  
//   con.end();
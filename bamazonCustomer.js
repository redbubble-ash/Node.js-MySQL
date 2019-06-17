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


con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
    // console.log("connected as id " + con.threadId + "\n");
    con.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("\nProducts are available to sale:\n" + cTable.getTable(result))

    });
    idSearch();
});

function idSearch() {

    var questions = [{
            name: "productId",
            type: "input",
            message: "Which product would you like to buy? Please enter product ID."
        },
        {
            name: "unitsToBuy",
            type: "input",
            message: "How many units would you like to buy?"
        }
    ];

    inquirer.prompt(questions).then(function (answer) {
        // console.log(answer);
        var query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
        con.query(query, {
            item_id: answer.productId
        }, function (err, res) {
            if (err) throw err;
            var unitPrice = res[0].price;
            var inventory = res[0].stock_quantity;
            var item_id = res[0].item_id;
            var units = parseInt(answer.unitsToBuy);
            var totalAmt = parseFloat((unitPrice * units).toFixed(2));
            var remain = inventory - units;
            if (units > inventory) {
                console.log("Insufficient quantity!");
            } else {
                updateProducts(item_id, remain);
                console.log("Item #" + item_id + " has remaining inventory of " + remain);
                console.log("The total cost of your purchase is " + totalAmt);
            }

        });
    });

};

function updateProducts(id, inv) {
    // console.log("Updating all products quantities ...\n");
    var query = "UPDATE products SET ? WHERE ?";
    var query = con.query(query, [{
            stock_quantity: inv
        }, {
            item_id: id
        }],
        function (err, res) {
            if (err) throw err;
            //   console.log(res.affectedRows + " products updated!\n");
        }
    );

    //   // logs the actual query being run
    console.log(query.sql);

}
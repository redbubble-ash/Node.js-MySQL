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
    runSearch();
});

function runSearch() {
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
        .then(function (answer) {
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

function saleSearch() {
    con.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("\nProducts are available to sale:\n" + cTable.getTable(result))

    });
}

function lowInvSearch() {
    con.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5",
        function (err, result, fields) {
            if (err) throw err;
            console.log("\nProducts are available to sale:\n" + cTable.getTable(result))

        });

}

function addInv() {

    var questions = [
        {
            name: "productId",
            type: "input",
            message: "Which product would you like to add more inventory. Enter product ID."
          },
          {
            name: "invToAdd",
            type: "input",
            message: "How many more inventory will be added to this product?"
        }

      ];

      inquirer.prompt(questions).then(function (answer) {
        var query = "SELECT * FROM products WHERE ?";
        con.query(query, {
            item_id: answer.productId
        }, function (err, res) {
            if (err) throw err;
            var inventory = res[0].stock_quantity;
            var item_id = res[0].item_id;
            var totalAdded = parseInt(answer.invToAdd);
            var remain = inventory + totalAdded;
            updateProducts(item_id, remain);
            console.log("The total inventory of product #" + item_id +" has increased by " + totalAdded +", now is " + remain + " in total.");
            saleSearch();
        });
    });
}

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


function addPro() {
    console.log("Inserting a new product...\n");
    var questions = [
        {
            name: "product",
            type: "input",
            message: "What product would you like to add on the list for sale."
        },
        {
            name: "department",
            type: "list",
            message: "Which department does it belong to?",
            choices: [
                "Electronics",
                "Pet",
                "Home",
                "Outdoor Recreation",
            ]
        },
        {
            name: "price",
            type: "input",
            message: "What is the unit price?"
        },
        {
            name: "inventory",
            type: "input",
            message: "What is the total number of inventory?"
        },


    ];

    inquirer.prompt(questions).then(function (answer) {

        var query = con.query(
            "INSERT INTO products SET ?", {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity:answer.inventory
            },
            function (err, res) {
                if (err) throw err;
            }
        );
    
        // logs the actual query being run
        console.log(query.sql);

    saleSearch();

    })


}
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
                "View Product Sales by Department",
                "Create New Department",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    salesReport();
                    break;

                case "Create New Department":
                    addNewDepartment();
                    break;

            }

        });
}

function salesReport() {
    var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP  BY department_name";
    var query = con.query(query,
        function (err, res) {
            if (err) throw err;
            console.log("\nProduct Sales by Department\n" + cTable.getTable(res))

        }

    );

}
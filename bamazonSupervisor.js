var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Welcome! You are connected with user id ${connection.threadId}`)
    listItems();
});

var overhead = 0;
var profit = 0;
var totalProfit = 0;
var departmentName = "";
var overhead = ""

function listItems() {
    connection.query(`SELECT * FROM products`, function (error, results) {
        if (error) throw err;
        inquirer.prompt([
            {
                name: "id",
                type: "rawlist",
                message: "What do you want to do?",
                choices: ["View Product Sales by Department",
                    "Create New Department"]
            }
        ]).then((answers) => {
            if (answers.id === "View Product Sales by Department") {
                console.log("Line 39 " + answers)

                connection.query(`SELECT * FROM departments`, function (error, results) {
                    if (error) throw err;
                    overhead = results[0].over_head_costs;
                    console.log(`Overhead =`, overhead)
                    profit = results[0].product_sales;
                    console.log(`Profit =`, profit)
                    totalProfit = profit - overhead;
                    console.log(`Total profit is ${totalProfit}`)
                })
            } else {

                inquirer.prompt([
                    {
                        name: "departmentName",
                        type: "input",
                        message: "What department do you want to add?"
                    },
                    {
                        name: "overhead",
                        type: "input",
                        message: "What's the overhead cost?"
                    }
                ]).then((answers) => {
                    departmentName = answers.departmentName;
                    overhead = answers.overhead;
                    console.log(answers.departmentName + " " + answers.overhead)
                    connection.query(`INSERT INTO departments(department_name,over_head_costs) VALUES ("${departmentName}",${overhead})`, function (error, results) {
                        if (error) throw err;
                        console.log(results)
                    })
                })

            }

        })

    })
}
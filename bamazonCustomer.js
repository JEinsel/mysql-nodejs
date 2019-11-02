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



function listItems() {
    connection.query(`SELECT * FROM products`, function (error, results) {
        if (error) throw err;
        console.log(`View our catalog!`);

        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            console.log(`ID: ${element.item_id} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
        }
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What item number do you wish to purchase?"
            }
        ]).then((answers) => {
            var userChoice = answers.id
            console.log(userChoice)
            if (results[userChoice].quantity === null) {
                console.log(userInput[userChoice].quantity)
                console.log("You cannot purchase that item")
            }
            else { console.log("There is enough quantity!") }

        })
            .catch((error) => {
                console.log("got error "+error);
            })
    }
    )
}

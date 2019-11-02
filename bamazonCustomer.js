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

var quantity = 0;
var price = 0;

function listItems() {
    connection.query(`SELECT * FROM products`, function (error, results) {
        if (error) throw err;
        console.log(`View our catalog!`);

        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            console.log(`ID: ${element.item_id} - Item Name:${element.name} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
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
            connection.query(`SELECT * FROM products WHERE item_id ="${userChoice}"`, function (error, results) {
                if (error) throw err;
                if (results[0].quantity === 0) {
                    console.log("Error, item quantity is 0 " + results[0].quantity)
                    console.log("That item is sold out, please try again later.")
                } else if (results[0].quantity > 0) {
                    console.log(`Your item information - ID: ${results[0].item_id} name: ${results[0].name} Department: ${results[0].department} Price: $${results[0].price} dollars`);
                }
                quantity = results[0].quantity;
                price = results[0].price;
            })
            inquirer.prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "How many do you want to buy?"
                }
            ]).then((answers) => {
                var sum = quantity - answers.choice;
                var total = price * answers.choice;
                if (sum <= 0) {
                    console.log(`There is not enough quantity`)
                } else {
                    connection.query(`UPDATE products SET quantity = ${sum} WHERE item_id ="${userChoice}"`, function (error, results) {
                        if (error) {
                            throw error;
                        }
                        console.log(results)
                        console.log(`Your price is $${total} dollars`)
                    })
                }
            })
        })
            .catch((error) => {
                console.log("got error " + error);
            })
    }
    )
}

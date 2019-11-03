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

var currentQuantity = 0;
var name = "";
var category = "";
var price = 0;
var quantity = 0;
var addQuantity = 0;
var newQuantity = 0;

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Welcome! You are connected with user id ${connection.threadId}`)
    listItems();
});


function listItems() {
    inquirer.prompt([
        {
            name: "action",
            type: "rawlist",
            message: "What function do you want to perform?",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add a new product"]
        }
    ]).then((answers) => {
        var userChoice = answers.action;
        console.log(userChoice)
        if (userChoice === "View products for sale") {


            connection.query(`SELECT * FROM products`, function (error, results) {
                if (error) throw error;
                console.log(`View our catalog!`);

                for (let i = 0; i < results.length; i++) {
                    const element = results[i];
                    console.log(`ID: ${element.item_id} - Item Name:${element.name} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
                }
            })
        }
        else if (userChoice === "View low inventory") {


            connection.query(`SELECT * FROM products WHERE quantity <10`, function (error, results) {
                if (error) throw error;
                console.log(`Items with less then 10 quantity in stock!`);

                for (let i = 0; i < results.length; i++) {
                    const element = results[i];
                    console.log(`ID: ${element.item_id} - Item Name:${element.name} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
                }
            })
        }
        else if (userChoice === "Add to inventory") {


            connection.query(`SELECT * FROM products`, function (error, results) {
                if (error) throw error;
                console.log(`List of products to add stock to -`);

                for (let i = 0; i < results.length; i++) {
                    const element = results[i];
                    console.log(`ID: ${element.item_id} - Item Name:${element.name} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
                }


                inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "What item do you want to stock?",
                    },
                    {
                        name: "stock",
                        type: "input",
                        message: "How many do you want to add to stock?"
                    }
                ]).then((answers) => {
                    connection.query(`SELECT * FROM products`, function (error, results) {
                        if (error) throw error;
                        console.log(`Items with less then 10 quantity in stock!`);
                        currentQuantity = results.quantity
                    })
                    addQuantity = parseFloat(answers.stock)
                    newQuantity = addQuantity + currentQuantity;
                    connection.query(`UPDATE products SET quantity =${newQuantity} WHERE item_id =${answers.id}`, function (error, results) {
                        if (error) throw error;
                        console.log(`Succesfully added ${addQuantity} to item #${answers.id}`);

                        for (let i = 0; i < results.length; i++) {
                            const element = results[i];
                            console.log(`ID: ${element.item_id} - Item Name:${element.name} - ${element.department} - $${element.price} -quantity:${element.quantity}`)
                        }
                    })
                })
            })
        }

        else if (userChoice === "Add a new product") {


            inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "What is the item you wish to add?"
                }, {
                    name: "category",
                    type: "input",
                    message: "What department?"
                }, {
                    name: "price",
                    type: "input",
                    message: "What is the price of the item?"
                }, {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want to have in stock?"
                }

            ]).then((answers) => {
                console.log(answers)
                name = answers.name;
                category = answers.category;
                price = answers.price;
                quantity = answers.quantity;
                price = parseFloat(price)
                quantity = parseFloat(quantity)

                connection.query(`INSERT INTO products (name,department,price,quantity) VALUES ("${name}","${category}",${price},${quantity})`, function (error, results) {
                    if (error) throw error;
                    console.log(`Successfully inserted ${name}`);

                    console.log(results)
                })
            })
        }
    })
}
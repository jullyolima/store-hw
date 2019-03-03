var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "",
    database: "store"
});


connection.connect(function (err) {
    if (err) throw err;
    goStore();
});

function goStore() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            console.log("Id: " + results[i].item_id + " Product: " + results[i].name + " Price $" + results[i].price + " Quantity remaining " + results[i].quantity)
        }
        inquirer
            .prompt([{
                name: "item",
                type: "input",
                message: "What item would you like to buy? (ID)?"
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }]).then(function (answer) {
                var chosenItem = answer.item;
                var quantity = answer.quantity;
                buy(chosenItem, quantity)
            })
    })
}






function buy(id, counter) {
    connection.query(
        "select * from products WHERE ?", [{
            item_id: id
        }],
        function (err, results) {
            if (err) throw err;
            if (counter > results[0].quantity) {
                console.log("We don't have enough units in stock, we only have " + results[0].quantity);
            } else {
                var stockQuantityAfter = results[0].quantity - counter;
                var totalCost = results[0].price * counter
                console.log("Your total is: " + totalCost);
                connection.query(
                    "update products set ? where ?", [{
                        quantity: stockQuantityAfter
                    },
                    {
                        item_id: id
                    }
                    ]

                )
                goStore();
            }
        })
}
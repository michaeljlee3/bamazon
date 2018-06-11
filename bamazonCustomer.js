var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Applemike93",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

function display() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + 
                    " || Product Name: " + res[i].product_name +
                    " || Price: $" + res[i].price
                    );
        } myPrompt()
    });
}

function myPrompt() {
    inquirer
      .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units would you like to buy?"
        }
      ])
      .then(function(answer) {
        var query = "SELECT product_name, price FROM products WHERE ?";
        connection.query(query, { item_id: answer.item_id }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Price: " + res[i].price + " || Product: " + res[i].product_name);
          }
          // runSearch();
        });
      });
  }

display();
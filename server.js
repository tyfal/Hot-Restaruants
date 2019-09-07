// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars restaurants (DATA)
// =============================================================
var restaurants = [
  {
    routeName: "Amaru",
    name: "Amaru",
    date: "9/7/2019",
    time: 7,
    party: 3
  },
  {
    routeName: "Oriole",
    name: "Oriole",
    date: "9/15/2019",
    time: 5,
    party: 2
  },
  {
    routeName: "El-Ideas",
    name: "El Ideas",
    date: "9/8/2019",
    time: 7,
    party: 6
  }
];
var waitingArray = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all restaurants
app.get("/api/restaurants", function(req, res) {
  return res.json(restaurants);
});

// Displays a single restaurant, or returns false
app.get("/api/restaurants/:restaurant", function(req, res) {
  var chosen = req.params.restaurant;

  console.log(chosen);

  for (var i = 0; i < restaurants.length; i++) {
    if (chosen === restaurants[i].routeName) {
      return res.json(restaurants[i]);
    }
  }

  return res.json(false);
});

app.get("/api/tables", function(req, res) {
  return res.json(restaurants);
});
app.get("/api/waitlist", function(req, res) {
  return res.json(waitingArray);
});

app.get("/api/clear", function(req, res) {
  waitingArray = [];
  restaurants = [];
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Create New restaurants - takes in JSON input
app.post("/api/restaurants", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newrestaurant = req.body;

  // Using a RegEx Pattern to remove spaces from newrestaurant
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newrestaurant.routeName = newrestaurant.name.replace(/\s+/g, "").toLowerCase();

  console.log(newrestaurant);
  if (restaurants.length <= 5){
    restaurants.push(newrestaurant);
  } else{
    waitingArray.push(newrestaurant);
  }

  res.json(newrestaurant);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

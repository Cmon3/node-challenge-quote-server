const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
app.get("/", function (request, response) {
  response.send("Hello world")
})
//   /quotes            - Should return all quotes (json)
app.get("/quotes", function (request, response) {
  response.send(200, `These are all your quotes: ${JSON.stringify(quotes)}`);
})
//   /quotes/random     - Should return ONE quote (json)
app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes);
  response.send(randomQuote);
});

app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes/search", function (request, response) {
  let term = request.query.term.toLowerCase();
  let matches = findQuotesContainingTerm(quotes, term)
  response.send(matches);
});

function findQuotesContainingTerm(q, t) {
  let matches = []
  q.forEach(item => {
    if (item.quote.includes(t) || item.author.includes(t)) {
      matches.push(item)
    }
  })
  return matches;
};


//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});

// Dependencies
var fs = require("fs");
var path = require("path")

var express = require("express");

var app = express();

var PORT = 8080;


app.use(express.static(path.join(__dirname + "/public")))


app.get("/",(req, res) =>{
  fs.readFile(__dirname + "/public/index.html", function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>");
    }
    else {
      // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
      // an html file.
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

 app.get("/notes", (req, res) => {
    fs.readFile(__dirname + "/public/notes.html", function(err, data) {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>");
        }
        else {
          // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
          // an html file.
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
});



// Starts our server.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

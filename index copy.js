// Dependencies
var fs = require("fs");
var path = require("path")

var express = require("express");

var app = express();

var PORT = 8080;

var array = [];

const notes = require('./db/db.json');
app.use(express.json())
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

app.get("/api/notes", (req, res) => {
  res.json(notes);

});

app.delete('/api/notes/:id', (req, res) => {
  //compare req.params.id to the ids in notes
  //if else statement that removes the object from the array in the else statement
  //use splice
  for(var i = 0; req.params.id > i; i++){
    if(err)throw err;
    array.splice(notes.id, 1)
  }
  console.log('delete');
  
  console.log(req.params);
      res.status(200).json({
        message: 'Deleted!'
      })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.post('/api/notes', (req, res) => {
  
  const newNote = req.body;
  console.log(req.body)
  
  array.concat(notes)
  array.push(newNote);
  console.log(array);
 
  console.log(JSON.stringify(array))

  
  fs.writeFile('./db/db.json', JSON.stringify(array), function(err){
    if(err) throw err;

  });
  res.json(req.body)
});

// Starts our server.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

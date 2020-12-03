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

// possibility of a collison 
// generate two of the same id is 1/100000
function rand(){
  return Math.floor(Math.random() * 1000000)
}


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
  let data = fs.readFileSync( __dirname + '/db/db.json', 'utf8')
  res.json(data);

});

app.delete('/api/notes/:id', (req, res) => {
  //compare req.params.id to the ids in notes
  //if else statement that removes the object from the array in the else statement
  //use splice
  
  let data = JSON.parse( fs.readFileSync( __dirname + "/db/db.json", 'utf8'))
  
  let newData = data.filter( note => note.id != req.params.id )

  fs.writeFile('./db/db.json', JSON.stringify(newData), function(err){
    if(err) throw err;
    res.json(newData)
  });
  
});

app.post('/api/notes', (req, res) => {
  
  const newNote = req.body;
  newNote.id = rand() // gnerate random id 

  let data = JSON.parse( fs.readFileSync( __dirname + '/db/db.json', 'utf8'))
  data.push(newNote)
  fs.writeFile('./db/db.json', JSON.stringify(data), function(err){
    if(err) throw err;
    res.json(data)
  });
  
});

// Starts our server.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

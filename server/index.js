const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const request = require('request');
const { API_KEY } = require('../config.js');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'myDB'
});

connection.connect((err) => {
  if (err) {
    HTMLFormControlsCollection.log('error: ', err.stack);
  } else {
    console.log('Connected');
  }
});

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.get('/books', (req, res) => {
  console.log('U GOT IT CAP\'N');
  res.send();
});
 
app.post('/library', (req, res) => {

});

app.post('/books', (req, res) => {
  let queryString = req.body.q;
  let options = {
    url: 'https://www.googleapis.com/books/v1/volumes',
    qs: { 
      q: queryString,
      maxResults: 5,
      key: API_KEY
    },
    useQueryString: true
  };  
  request(options, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      body = JSON.parse(body);
      res.status(201).send(body.items);
    }
  })
});

app.use(express.static('client'));
app.listen(3000, () => {
  console.log('Listening on port Andre 3000 suckazz');
});

// `https://www.googleapis.com/books/v1/volumes?q=harry+potter+the+prisoner&key=${API_KEY}`
// intitle and inauthor keywords 



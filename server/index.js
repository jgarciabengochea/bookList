const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const request = require('request');
const { API_KEY } = require('../config.js');

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.get('/books', (req, res) => {
  console.log('U GOT IT CAP\'N');
  res.send();
});

app.post('/books', (req, res) => {
  console.log('POSTED UP');
  request('https://www.googleapis.com/books/v1/volumes?q=')
  res.send();
});
// path url is from the root directory not a relative path so dont need any ../
app.use(express.static('client'));
app.listen(3000, () => {
  console.log('Listening on port Andre 3000 suckazz');
});

// `https://www.googleapis.com/books/v1/volumes?q=harry+potter+the+prisoner&key=${API_KEY}`
// intitle and inauthor keywords 
// will need to split the search strings and place '+'s in between
// request(`https://www.googleapis.com/books/v1/volumes?q=intitle:harry+potter+the+sorcer&key=${API_KEY}`, (err, response, body) => {
//   if (err) {
//     console.log(err);
//   } else {
//     body = JSON.parse(body);
//     console.log(body.items[0]);
//   }
// })

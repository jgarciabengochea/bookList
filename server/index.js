const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const request = require('request');
const { API_KEY } = require('../config.js');
const mysql = require('mysql2');
const _ = require('lodash');
const { utils } = require('../helpers/utils.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'myDB',
  multipleStatements: true
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

app.post('/library', (req, res) => {
  let { title, author, image } = req.body.data;
  let sqlString = `INSERT IGNORE INTO authors (name) VALUES ("${author}"); INSERT IGNORE INTO books (title, author, image) VALUES ("${title}", (select id from authors where name="${author}"), "${image}" )`;
  connection.query(sqlString, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(201).send();
  })
});

app.delete('/library', (req, res) => {
  let { title, author } = req.body.data;
  let params = [title, author];
  let sqlString = 'delete from books, authors using books inner join authors on books.author=authors.id where books.title = ? and authors.name = ?;';
  connection.query(sqlString, params, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(201).send();
  })
})

app.get('/books', (req, res) => {
console.log('U GOT IT CAP\'N');
  res.send();
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
      res.status().send()
    } else {
      let sqlString = 'select title from books;';
      connection.query(sqlString, (err, results, fields) => {
        body = JSON.parse(body);
        let formattedResults = utils.formatData(body.items);
        if (results.length === 0) {
          res.status(201).send(formattedResults);
        } else {
          let savedTitles = _.map(results, (result) => {
            return result.title;
          })
          formattedResults.forEach((item) => {
            if (savedTitles.indexOf(item.title) > 0) {
              item.saved = true;
            }
          });
          res.status(201).send(formattedResults);
        }
      });
    }
  })
});

app.use(express.static('client'));
app.listen(3000, () => {
  console.log('Listening on port Andre 3000 suckazz');
});

// `https://www.googleapis.com/books/v1/volumes?q=harry+potter+the+prisoner&key=${API_KEY}`
// intitle and inauthor keywords 



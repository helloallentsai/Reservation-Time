require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

//mongo
// const db = require('./db/overviewDAO.js');

//cassandra
const client = require('./db/cassandra/index.js');

//postgres
// const db = require('./db/postgres/index.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/restaurant/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;

  const query = `SELECT * FROM overviews WHERE id=${id}`;
  client.execute(query)
    .then(result => res.status(200).send(result.rows[0]))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/api/restaurant/', (req, res) => {
  const data = req.body;

  const query = `INSERT INTO overviews(id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category,topTags,"description") VALUES (?,?,?,?,?,?,?,?,?,?)`;

  client.execute(query, data, { prepare: true })
    .then(result => res.status(201).send('restaurant inserted'))
    .catch(err => {
      console.log(err);
      res.status(400).end();
    });
});

app.put('/api/restaurant/:restaurantId', (req, res) => {
  const data = req.body;
  const id = req.params.restaurantId;

  const query = `UPDATE overviews SET title=?,review=?,reviewStars=?,numOfReviews=?,pricePerPersonLow=?,pricePerPersonHigh=?,category=?,topTags=?,"description"=? WHERE id=${id}`;

  client.execute(query, [data.title, data.review, data.reviewStars, data.numOfReviews, data.pricePerPersonLow, data.pricePerPersonHigh, data.category, data.topTags, data.description], { prepare: true })
    .then(result => res.status(201).send('restaurant updated'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });

});

app.delete('/api/restaurant/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;

  const query = `DELETE FROM overviews WHERE id=${id}`;
  client.execute(query)
    .then(result => res.status(200).send('restaurant deleted'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

//route for stress test
app.post('/stress/restaurant/:restaurantId', (req, res) => {
  const data = req.body;
  data.id = req.params.restaurantId;

  const query = `INSERT INTO overviews(id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category,topTags,"description") VALUES (?,?,?,?,?,?,?,?,?,?)`;
  // console.log(data);

  client.execute(query, data, { prepare: true })
    .then(result => res.status(201).send('restaurant inserted'))
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
    .then(() => client.execute(`DELETE FROM overviews WHERE id=${data.id}`));
});

module.exports = app;
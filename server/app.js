const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db/overviewDAO.js');

const app = express();

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

  db.read(id)
    .then(entry => res.status(200).send(entry))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/api/restaurant/', (req, res) => {
  const data = req.body;
  db.create(data)
    .then(() => res.status(201).send('Restaurant created'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.put('/api/restaurant/:restaurantId', (req, res) => {
  const data = req.body;
  const id = req.params.restaurantId;

  db.update(id, data)
    .then(entry => res.status(200).send('Entry updated'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.delete('/api/restaurant/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;

  db.del(id)
    .then(entry => res.status(200).send(entry))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

module.exports = app;
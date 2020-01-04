const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { P2cBalancer } = require('load-balancers');


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

const proxies = [
  '172.31.5.1',
  '172.31.14.222'
];

const balancer = new P2cBalancer(proxies.length);
const proxy = proxies[balancer.pick()];

console.log(proxy);

const PORT = 3010;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
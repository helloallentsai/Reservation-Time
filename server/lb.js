const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { P2cBalancer } = require('load-balancers');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const proxies = [
  'http://172.31.5.1:3001',
  'http://172.31.14.222:3001'
];

const balancer = new P2cBalancer(proxies.length);
const server = proxies[balancer.pick()];

console.log(server);

app.use(proxy('/', { target: server }));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
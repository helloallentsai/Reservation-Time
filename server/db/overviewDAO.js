const db = require('./index.js');
const Overview = require('../models/restaurant-overview.js');


const read = (id) => {
  const query = Overview.findOne({ id: id });
  return query.exec();
};

const create = (data) => {
  const entry = new Overview(data);

  return Overview.create(entry)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const update = (id, data) => {
  const query = Overview.findOneAndUpdate({ id }, data, { upsert: true });
  return query.exec();
};

const del = (id) => {
  const query = Overview.findOneAndDelete({ id });
  return query.exec();
};

module.exports = { create, read, update, del };
const cassandra = require('cassandra-driver');
const contactpoint = '127.0.0.1' || '172.31.27.109:9042';

const client = new cassandra.Client({
  contactPoints: [contactpoint],
  localDataCenter: 'datacenter1',
  keyspace: 'opentable',
  pooling: {
    // coreConnectionsPerHost: {
    //   [distance.local] : 2,
    //   [distance.remote] : 1
    // },
    maxRequestsPerConnection: 32768,
  }
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Cassandra connected');

  }
});

module.exports = client;


//   const query = `INSERT INTO overviews (id, title, review, reviewStars, numOfReviews, pricePerPersonLow, pricePerPersonHigh, category, topTags, "description") VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?)`;

//   client.execute(query, entry, { prepare: true })
//     .then(() => console.log(`${i} of entries inserted`))
//     .catch(err => errors.push(err))
//     .then(() => console.log(errors[0]));

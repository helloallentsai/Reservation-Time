const cassandra = require('cassandra-driver');
const contactpoint = '127.0.0.1';

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

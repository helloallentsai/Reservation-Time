# Restaurant Time
An app for reservation page displaying overview, map, and availability dates/times. Horizontally scaled EC2 servers and load balanced with NGINX to improve query times by 40x. Designed data generation script to insert 10m entries into database while reducing memory usage by 50%. Generated application load testing with NewRelic and Loader.io to maintain 0% error rate at 1k rps.

## Photos
New Relic dashboard

![newrelic](../assets/newrelic.png?raw=true)

GET request before load balancing

![nolb](../assets/nolb.png?raw=true)

GET request before load balancing

![lb](../assets/lb.png?raw=true)

## Getting Started

Navigate to preferred local directory and clone the github repo:

```
$ git clone https://github.com/helloallentsai/EatAt.git
```

To transpile React components and start server, navigate inside the directory and run the following commands:

```
$ npm install
$ node ./server/db/data/generate.js
$ npm run build
$ npm start
```

To generate database csv file, run the following command:

```
$ node ./server/db/data/generate.js
```



Import .csv files into database of choice. Server is setup for Cassandra. Should you choose Postgres, you can generate data for Postgres syntax by running the following command:

```
$ node ./server/db/data/post-generate.js
```

## Built With

 - ReactJS
 - NodeJS
 - Cassandra
 - Express

## Related Projects

  - https://github.com/hrr42-sdc2/service-katie
  - https://github.com/hrr42-sdc2/ronsdcres
  - https://github.com/hrr42-sdc2/opentable-imagecarousel-service
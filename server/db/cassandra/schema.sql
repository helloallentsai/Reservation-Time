CREATE TABLE overviews (
  id int PRIMARY KEY,
  title text,
  review float,
  reviewStars list<int>,
  numOfReviews int,
  pricePerPersonLow text,
  pricePerPersonHigh text,
  category text,
  topTags list<text>,
  "description" text
);

/*
CREATE KEYSPACE opentable WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

COPY overviews (id, title, review, reviewStars, numOfReviews, pricePerPersonLow, pricePerPersonHigh, category, topTags, "description") FROM '../service/server/db/data/csv/overview.csv' WITH DELIMITER=';' AND HEADER=TRUE;

//for ec2
COPY overviews (id, title, review, reviewStars, numOfReviews, pricePerPersonLow, pricePerPersonHigh, category, topTags, "description") FROM '../service-overview-allen/server/db/data/csv/overview1.csv' WITH DELIMITER=';' AND HEADER=TRUE;
*/
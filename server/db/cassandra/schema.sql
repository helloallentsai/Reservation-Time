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
$ COPY overviews (id, title, review, reviewStars, numOfReviews, pricePerPersonLow, pricePerPersonHigh, category, topTags, "description") FROM '../service/server/db/data/csv/overview1.csv' WITH DELIMITER=';' AND HEADER=TRUE;
*/
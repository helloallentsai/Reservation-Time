CREATE TABLE overviews (
  id int PRIMARY KEY,
  title text,
  review real,
  reviewStars int[],
  numOfReviews int,
  pricePerPersonLow text,
  pricePerPersonHigh text,
  category_id int,
  topTags text[],
  "description" text
);

CREATE TABLE categories (
  id int PRIMARY KEY,
  category text
);

/*
COPY overviews(id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category_id,topTags,"description") FROM '/Users/allentsai/desktop/hr_bootcamp/sdc/service/server/db/data/csv/postgres-overview1.csv' DELIMITER ';' CSV HEADER;

COPY categories(id,category) FROM '/Users/allentsai/desktop/hr_bootcamp/sdc/service/server/db/data/csv/postgres-categories.csv' DELIMITER ';' CSV HEADER;
*/
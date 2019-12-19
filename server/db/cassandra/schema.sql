CREATE TABLE overviews (
  id int PRIMARY KEY,
  title text,
  review int,
  reviewStars list<int>,
  numOfReviews int,
  pricePerPersonLow text,
  pricePerPersonHigh text,
  category text,
  topTags list<text>,
  "description" text
);


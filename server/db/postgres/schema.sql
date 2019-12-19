CREATE TABLE overview (
  restaurant_id int PRIMARY KEY,
  title text,
  review int,
  reviewStars int[],
  numOfReviews int,
  pricePerPersonLow text,
  pricePerPersonHigh text,
  category text,
  topTags text[],
  description text
);

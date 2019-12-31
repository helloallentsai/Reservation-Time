const faker = require('faker');
const categories = require('../server/db/categories.json');

const randomId = (context, ee, next) => {
  const id = Math.floor(Math.random() * 1000000 + 9000000);
  context.vars.id = id;
  next();
};


const randomData = (context, ee, next) => {
  const id = faker.random.number({ min: 10000001, max: 11000000 });
  const title = faker.random.words();
  const review = Math.round(((Math.random() * 2) + 3) * 10) / 10;
  const reviewStars = [];
  for (let k = 0; k < review - 1; k++) {
    reviewStars.push(1);
  }
  if (Number.isInteger(review)) {
    reviewStars.push(1);
  } else if ((review - Math.floor(review)) >= 0.5) {
    reviewStars.push(0);
  }
  const numOfReviews = Math.floor(Math.random() * 10000);
  const pricePerPersonLow = JSON.stringify(Math.floor(Math.random() * 50));
  const pricePerPersonHigh = JSON.stringify(50 + Math.floor(Math.random() * 50));
  const category = categories[Math.floor(Math.random() * categories.length)];
  const topTags = [`${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}`];
  const description = faker.lorem.sentences((Math.random() * 4) + 2);

  context.vars.id = id;
  context.vars.title = title;
  context.vars.review = review;
  context.vars.reviewStars = reviewStars;
  context.vars.numOfReviews = numOfReviews;
  context.vars.pricePerPersonLow = pricePerPersonLow;
  context.vars.pricePerPersonHigh = pricePerPersonHigh;
  context.vars.category = category;
  context.vars.topTags = topTags;
  context.vars.description = description;

  next();
};

module.exports = { randomId, randomData };
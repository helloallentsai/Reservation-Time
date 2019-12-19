const client = require('./index.js');
const faker = require('faker');
const categories = require('../categories.json');

const NUM_OF_ENTRIES = 5000;

const seed = (num) => {
  let entry = [];
  let errors = [];

  for (let i = 0; i < num; i++) {
    const tags = [];
    for (let j = 0; j < 3; j++) {
      tags.push(faker.commerce.productAdjective());
    }

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

    entry = [
      i + 1,
      faker.company.companyName(),
      review,
      reviewStars,
      Math.floor(Math.random() * 10000),
      JSON.stringify(Math.floor(Math.random() * 50)),
      JSON.stringify(50 + Math.floor(Math.random() * 50)),
      categories[Math.floor(Math.random() * categories.length)],
      tags,
      faker.lorem.paragraphs()
    ];

    const query = `INSERT INTO overviews (id, title, review, reviewStars, numOfReviews, pricePerPersonLow, pricePerPersonHigh, category, topTags, "description") VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?)`;

    client.execute(query, entry, { prepare: true })
      .then(() => console.log(`${i} of entries inserted`))
      .catch(err => errors.push(err))
      .then(() => console.log(errors[0]));
  }

};

seed(NUM_OF_ENTRIES);


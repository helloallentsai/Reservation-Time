const fs = require('fs');
const faker = require('faker');
const categories = require('../categories.json');

const generateData = (path) => {

  const ws = fs.createWriteStream(path);
  ws.write(`id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category_id,topTags,"description"\n`);

  let i = 10000000;
  const start = new Date();

  const generate = () => {
    let ok = true;

    do {
      const id = i;
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
      const pricePerPersonLow = Math.floor(Math.random() * 50);
      const pricePerPersonHigh = 50 + Math.floor(Math.random() * 50);
      const categoryId = Math.floor(Math.random() * categories.length) + 1;
      const tags = `${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}`;
      const description = faker.lorem.sentences((Math.random() * 4) + 2);

      const entry = `${id};${title};${review};{${reviewStars}};${numOfReviews};${pricePerPersonLow};${pricePerPersonHigh};${categoryId};{${tags}};${description}\n`;
      i--;

      if (i === 0) {
        ws.write(entry);
        console.log(`About ${(new Date() - start) / 1000} seconds to generate`);
      } else {
        ok = ws.write(entry);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      ws.once('drain', generate);
    }
  };
  generate();
};

const generateCategories = () => {
  const ws = fs.createWriteStream('./csv/postgres-categories.csv');
  ws.write(`id,category\n`);

  for (let i = 0; i < categories.length; i++) {
    const id = i + 1;
    const category = categories[i];

    const entry = `${id};${category}\n`;

    ws.write(entry);
  }
  ws.end();
  console.log('categories generated');
};

generateData('./csv/postgres-overview.csv');
generateCategories();




const fs = require('fs');
const faker = require('faker');
const categories = require('../categories.json');


const generateData = (path, start) => {

  const ws = fs.createWriteStream(path);
  ws.write(`id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category,topTags,"description"\n`);

  let i = 10000000 - start + 1;
  let target = i - 2000000;

  const now = new Date();

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
      const category = categories[Math.floor(Math.random() * categories.length)];
      const tags = `${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}`;
      const description = faker.lorem.sentences((Math.random() * 4) + 2);

      const entry = `${id};${title};${review};[${reviewStars}];${numOfReviews};${pricePerPersonLow};${pricePerPersonHigh};${category};[${tags}];${description}\n`;
      i--;

      if (i === target) {
        ws.write(entry);
        console.log(`About ${(new Date() - now) / 1000} seconds to generate`);
      } else {
        ok = ws.write(entry);
      }
    } while (i > target && ok);

    if (i > target) {
      ws.once('drain', generate);
    }
  };
  generate();
};

generateData('./csv/overview1.csv', 1);
generateData('./csv/overview2.csv', 2000001);
generateData('./csv/overview3.csv', 4000001);
generateData('./csv/overview4.csv', 6000001);
generateData('./csv/overview5.csv', 8000001);





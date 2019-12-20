const fs = require('fs');
const faker = require('faker');
const categories = require('../categories.json');

const generateData = (filepath, start) => {

  const ws = fs.createWriteStream(filepath);

  ws.write(`id,title,review,reviewStars,numOfReviews,pricePerPersonLow,pricePerPersonHigh,category_id,topTags,"description"\n`);

  const total = start + 1000000;
  for (let i = start; i < total; i++) {

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

    ws.write(entry);
  }
  ws.end();
  console.log(`entries ${start} - ${total - 1} generated`);
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

const now = new Date();
generateData('./csv/postgres-overview1.csv', 1);
generateData('./csv/postgres-overview2.csv', 1000001);
generateData('./csv/postgres-overview3.csv', 2000001);
generateData('./csv/postgres-overview4.csv', 3000001);
generateData('./csv/postgres-overview5.csv', 4000001);
generateData('./csv/postgres-overview6.csv', 5000001);
generateData('./csv/postgres-overview7.csv', 6000001);
generateData('./csv/postgres-overview8.csv', 7000001);
generateData('./csv/postgres-overview9.csv', 8000001);
generateData('./csv/postgres-overview10.csv', 9000001);
generateCategories();
console.log(`About ${Number((new Date() - now) / 60000).toFixed(2)} minutes to generate`);




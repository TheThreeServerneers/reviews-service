const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const { NUM_PRODUCTS, NUM_USERS, MAX_REVIEWS_PER_PRODUCT } = require('./generationConfig.js');

const writer = csvWriter();
writer.pipe(fs.createWriteStream('reviews.csv'));

let i = 1;
let counter = 1;

const write = () => {
  let ok = true;

  while (i <= NUM_PRODUCTS && ok) {
    const numReviews = faker.random.number({ max: MAX_REVIEWS_PER_PRODUCT, min: 1 });
    for (let j = 0; j < numReviews; j += 1) {
      ok = writer.write({
        reviews_id: counter,
        product_id: i,
        user_id: faker.random.number({ max: NUM_USERS, min: 1 }),
        title: `${counter}${faker.random.words()}`,
        text: faker.lorem.paragraph(),
        score: faker.random.number({ max: 5, min: 1 }),
        date: faker.date.between('2019-01-09', '2018-10-09').toISOString().split('T')[0],
        found_helpful: faker.random.number(25),
      });
      counter += 1;
    }
    i += 1;
  }

  if (i <= NUM_PRODUCTS) {
    writer.once('drain', write);
  }
};

write();

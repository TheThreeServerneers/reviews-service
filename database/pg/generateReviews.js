const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');

// const NUM_PRODUCTS = 10000000;
const MAX_REVIEWS_PER_PRODUCT = 10;

const makeCSV = (filename, startIndex, NUM_PRODUCTS) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream(filename));

  let i = startIndex;

  const write = () => {
    let ok = true;

    while (i <= NUM_PRODUCTS && ok) {
      const numReviews = faker.random.number({ max: MAX_REVIEWS_PER_PRODUCT, min: 0 });
      for (let j = 0; j < numReviews; j += 1) {
        ok = writer.write({
          product_id: i,
          username: faker.internet.userName(),
          is_verified: faker.random.boolean(),
          title: faker.random.words(),
          review_text: faker.lorem.paragraph(),
          score: faker.random.number({ max: 5, min: 1 }),
          review_date: faker.date.between('2019-01-09', '2018-10-09').toISOString().split('T')[0],
          found_helpful: faker.random.number(25),
        });
      }
      i += 1;
    }

    if (i <= NUM_PRODUCTS) {
      writer.once('drain', write);
    }
  };

  write();
};

makeCSV('reviews1.csv', 1, 2500000);
// makeCSV('reviews2.csv', 2500001, 5000000);
// makeCSV('reviews3.csv', 5000001, 7500000);
// makeCSV('reviews4.csv', 7500001, 10000000);

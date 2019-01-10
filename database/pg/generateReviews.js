const fs = require('fs');
const faker = require('faker');
const { NUM_PRODUCTS, NUM_USERS, MAX_REVIEWS_PER_PRODUCT } = require('./generationConfig.js');

const makeReviews = (numReviews, productNum) => {
  const reviews = [];
  for (let i = 0; i < numReviews; i += 1) {
    const review = [
      productNum,
      faker.random.number({ max: NUM_USERS, min: 1 }),
      faker.random.words(),
      faker.lorem.paragraph(),
      faker.random.number({ max: 5, min: 1 }),
      faker.date.between('2019-01-09', '2018-10-09').toISOString().split('T')[0],
      faker.random.number(25),
    ];
    reviews.push(review.join(','));
  }
  return `${reviews.join('\n')}\n`;
};

const writeStream = fs.createWriteStream('reviews.csv');
let i = 1;

writeStream.write('PRODUCT_ID, USER_ID, TITLE, TEXT, SCORE, DATE, FOUND_HELPFUL\n');
const write = () => {
  let ok = true;

  while (i <= NUM_PRODUCTS && ok) {
    const numReviews = faker.random.number({ max: MAX_REVIEWS_PER_PRODUCT, min: 1 });
    const reviews = makeReviews(numReviews, i);
    ok = writeStream.write(reviews);
    i += 1;
  }

  if (i <= NUM_PRODUCTS) {
    writeStream.once('drain', write);
  }
};

write();

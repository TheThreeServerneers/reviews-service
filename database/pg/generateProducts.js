const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const { NUM_PRODUCTS } = require('./generationConfig.js');

const writer = csvWriter();
writer.pipe(fs.createWriteStream('products.csv'));

let i = 0;

const write = () => {
  let ok = true;

  while (i < NUM_PRODUCTS && ok) {
    ok = writer.write({ name: faker.random.word() });
    i += 1;
  }

  if (i < NUM_PRODUCTS) {
    writer.once('drain', write);
  }
};

write();

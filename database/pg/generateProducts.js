const fs = require('fs');
const faker = require('faker');
const { NUM_PRODUCTS } = require('./generationConfig.js');

const writeStream = fs.createWriteStream('products.csv');
let i = 0;

writeStream.write('NAME\n');
const write = () => {
  let ok = true;

  while (i < NUM_PRODUCTS && ok) {
    ok = writeStream.write(`${faker.random.word()}\n`);
    i += 1;
  }

  if (i < NUM_PRODUCTS) {
    writeStream.once('drain', write);
  }
};

write();

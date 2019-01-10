const fs = require('fs');
const faker = require('faker');
const { NUM_USERS } = require('./generationConfig.js');

const writeStream = fs.createWriteStream('users.csv');
let i = 0;

writeStream.write('NAME, IS_VERIFIED\n');
const write = () => {
  let ok = true;

  while (i < NUM_USERS && ok) {
    ok = writeStream.write(`${faker.internet.userName()}, ${faker.random.boolean()}\n`);
    i += 1;
  }

  if (i < NUM_USERS) {
    writeStream.once('drain', write);
  }
};

write();

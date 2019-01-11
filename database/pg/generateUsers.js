const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const { NUM_USERS } = require('./generationConfig.js');

const writer = csvWriter();
writer.pipe(fs.createWriteStream('users.csv'));

let i = 0;

const write = () => {
  let ok = true;

  while (i < NUM_USERS && ok) {
    ok = writer.write({ name: faker.internet.userName(), is_verified: faker.random.boolean() });
    i += 1;
  }

  if (i < NUM_USERS) {
    writer.once('drain', write);
  }
};

write();

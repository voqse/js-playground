const mongoose = require('mongoose');

function getUri() {
  return process.env.MONGO_URI + (process.env.TEST_COLLECTION !== undefined ? process.env.TEST_COLLECTION : '');
}

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(getUri());
    console.log(`MongoDB connected to ${getUri()}`);
  }
}

async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log(`${getUri()} dropped`);
}

async function dropCollection(collection) {
  await mongoose.connection.collections[collection].deleteMany();
  console.log(`${getUri()} dropped ${collection} collection`);
}

async function disconnectDb() {
  await mongoose.connection.close();
  console.log(`${getUri()} connection closed`);
}

module.exports = {
  connectDb,
  dropDb,
  dropCollection,
  disconnectDb,
};

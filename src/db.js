import mongoose from 'mongoose';

function getUri() {
  return process.env.MONGO_URI + (process.env.TEST_COLLECTION !== undefined ? process.env.TEST_COLLECTION : '');
}

export async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(getUri());
    console.log(`MongoDB connected to ${getUri()}`);
  }
}

export async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log(`${getUri()} dropped`);
}

export async function dropCollection(collection) {
  await mongoose.connection.collections[collection].deleteMany();
  console.log(`${getUri()} dropped ${collection} collection`);
}

export async function disconnectDb() {
  await mongoose.connection.close();
  console.log(`${getUri()} connection closed`);
}

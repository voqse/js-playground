import mongoose from 'mongoose';

const uri = process.env.MONGO_URI + (process.env.TEST_COLLECTION !== undefined ? process.env.TEST_COLLECTION : '');

export async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
    console.log(`MongoDB connected to ${uri}`);
  }
}

export async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log(`${uri} dropped`);
}

export async function dropCollection(collection) {
  await mongoose.connection.collections[collection].deleteMany();
  console.log(`${uri} dropped ${collection} collection`);
}

export async function disconnectDb() {
  await mongoose.connection.close();
  console.log(`${uri} connection closed`);
}

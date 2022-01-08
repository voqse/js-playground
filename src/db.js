import mongoose from 'mongoose';

export async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGO_URI}${process.env.TEST_COLLECTION}`);
    console.log(`MongoDB connected to ${process.env.MONGO_URI}${process.env.TEST_COLLECTION}`);
  }
}

export async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log('MongoDB dropped');
}

export async function dropCollection(collection) {
  await mongoose.connection.collections[collection].deleteMany();
  console.log(`MongoDB dropped ${collection} collection`);
}

export async function disconnectDb() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
}

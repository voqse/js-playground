import mongoose from 'mongoose';

export async function connectDb(uri) {
  await mongoose.connect(uri);
  console.log(`MongoDB connected to ${uri}`);
}

export async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log('MongoDB dropped');
}

export async function disconnectDb() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
}

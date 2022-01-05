import mongoose from 'mongoose';

export async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
}

export async function dropDb() {
  await mongoose.connection.db.dropDatabase();
  console.log('MongoDB dropped');
}

export async function disconnectDb() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
}

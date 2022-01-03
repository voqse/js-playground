import mongoose from 'mongoose';

export async function connectDb(uri) {
  await mongoose.connect(uri || process.env.MONGO_URI).then(() => {
    console.log(`MongoDB connected to ${uri || process.env.MONGO_URI}`);
  }).catch((error) => {
    console.error(error);
  });
}

export async function clearDb() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany().then(() => {
      console.log(`Cleared ${key} collection`);
    });
  }
}

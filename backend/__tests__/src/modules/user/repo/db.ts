import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = MongoMemoryServer.create();

// Connect to the in-memory database.
export const connect = async () => {

  // Ensure the database is connected
  if(!(await mongod).instanceInfo) {
    await (await mongod).start();
  }
  const uri = (await mongod).getUri();
  await mongoose.connect(uri);
}

// Drop in-memory database, close the connection and stop mongod.
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
}

// Remove all data for all in-memory db collections.
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key as keyof typeof collections];
    if (collection) {
      await collection.deleteMany({});
    }
  }
}

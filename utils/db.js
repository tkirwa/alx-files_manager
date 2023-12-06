// utils/db.js

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Display any errors in the console
    this.client.connect((err) => {
      if (err) {
        console.log(`DBClient connection error: ${err}`);
      } else {
        console.log('DBClient connected to MongoDB');
      }
    });
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Get the number of documents in the 'users' collection
  async nbUsers() {
    const usersCollection = this.client.db().collection('users');
    return usersCollection.countDocuments();
  }

  // Get the number of documents in the 'files' collection
  async nbFiles() {
    const filesCollection = this.client.db().collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;

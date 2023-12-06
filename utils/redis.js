// utils/redis.js

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = createClient();

    // Display any errors in the console
    this.client.on('error', (err) => {
      console.log(`Redis client error: ${err}`);
    });
  }

  // Check if the connection to Redis is alive
  isAlive() {
    return this.client.connected;
  }

  // Get the value stored for a given key
  async get(key) {
    return new Promise((resolve) => {
      this.client.get(key, (err, reply) => {
        resolve(reply);
      });
    });
  }

  // Set a value in Redis with an expiration duration
  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  // Remove the value in Redis for a given key
  async del(key) {
    this.client.del(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

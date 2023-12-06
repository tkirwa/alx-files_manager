// controllers/AppController.js

import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(_, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    return res.status(200).json(status);
  }

  static async getStats(_, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    const stats = {
      users: usersCount,
      files: filesCount,
    };
    return res.status(200).json(stats);
  }
}

export default AppController;

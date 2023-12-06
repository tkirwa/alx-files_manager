// controllers/AuthController.js

import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const user = await dbClient.client.db().collection('users').findOne({ email, password: dbClient.sha1Hash(password) });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = uuidv4();
    const key = `auth_${token}`;

    await redisClient.set(key, user._id.toString(), 86400); // 24 hours

    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const { 'x-token': xToken } = req.headers;

    if (!xToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${xToken}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await redisClient.del(`auth_${xToken}`);
    return res.status(204).send();
  }
}

export default AuthController;

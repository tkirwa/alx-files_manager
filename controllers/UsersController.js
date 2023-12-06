// controllers/UsersController.js

import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.client.db().collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = uuidv4(); // Replace with actual SHA1 hashing

    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await dbClient.client.db().collection('users').insertOne(newUser);

    const { _id: id } = result.ops[0];

    return res.status(201).json({ id, email });
  }
}

export default UsersController;

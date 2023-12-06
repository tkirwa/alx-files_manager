/* eslint-disable no-const-assign */
// controllers/FilesController.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');

const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';

class FilesController {
  static async postUpload(req, res) {
    const { name, type, data, parentId, isPublic } = req.body;
    const { userId } = req.user;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (!parentId) {
      parentId = 0;
    } else {
      const parentFile = await dbClient.files.findOne({
        _id: ObjectId(parentId),
      });

      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }

      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    let localPath;

    if (type !== 'folder') {
      if (!data) {
        return res.status(400).json({ error: 'Missing data' });
      }

      if (!fs.existsSync(FOLDER_PATH)) {
        fs.mkdirSync(FOLDER_PATH, { recursive: true });
      }

      localPath = path.join(FOLDER_PATH, uuidv4());

      fs.writeFileSync(localPath, Buffer.from(data, 'base64'));
    }

    const newFile = {
      userId: ObjectId(userId),
      name,
      type,
      isPublic: isPublic || false,
      parentId: ObjectId(parentId),
      localPath,
    };

    const result = await dbClient.files.insertOne(newFile);

    return res.status(201).json(result.ops[0]);
  }

  static async getShow(req, res) {
    const { id } = req.params;
    const { userId } = req.user;

    const file = await dbClient.files.findOne({
      _id: ObjectId(id),
      userId: ObjectId(userId),
    });

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.json(file);
  }

  static async getIndex(req, res) {
    const { parentId, page } = req.query;
    const { userId } = req.user;
    const perPage = 20;
    const pageNumber = parseInt(page) || 0;

    const matchQuery = {
      userId: ObjectId(userId),
      parentId: parentId ? ObjectId(parentId) : 0,
    };

    const files = await dbClient.files
      .aggregate([
        { $match: matchQuery },
        { $skip: perPage * pageNumber },
        { $limit: perPage },
      ])
      .toArray();

    return res.json(files);
  }
}

module.exports = FilesController;

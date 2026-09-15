import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Activity, User } from './models/index.js';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(cors());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/users', async (_request, response) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: 1 }).lean();
    response.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).json({ error: 'Unable to fetch users' });
  }
});

app.get('/api/activities', async (_request, response) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'username profile.displayName')
      .populate('teamId', 'name')
      .sort({ completedAt: -1 })
      .lean();
    response.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    response.status(500).json({ error: 'Unable to fetch activities' });
  }
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
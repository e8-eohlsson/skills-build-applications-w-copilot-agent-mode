import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
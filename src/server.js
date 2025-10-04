
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';


const app = express();
const PORT = process.env.PORT || 3030;

app.use(logger);
app.use(express.json({
  limit: '100kb',
}));
app.use(cors());


app.get('/notes', (req, res) => {
  return res.status(200).json({ message: "Retrieved all notes" });
});

app.get('/notes/:notesId', (req, res) => {
  const { noteId } = req.params;
  return res
    .status(200)
    .json({ message: `Retrieved note with ID: ${noteId}` });
});


app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use("/notes", notesRoutes);

await connectMongoDB();

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

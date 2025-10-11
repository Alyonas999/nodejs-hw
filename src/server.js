
import express from 'express';
import 'dotenv/config;';
import cors from 'cors';
import { errors } from "celebrate";
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';


const app = express();

app.use(cors());
app.use(express.json({limit: '100kb',}));
app.use(logger);


app.use("/notes", notesRoutes);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);


const startServer = async () => {
  await connectMongoDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();


import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import { errors } from "celebrate";
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import cookieParser from "cookie-parser";


import notesRoutes from './routes/notesRoutes.js';
const app = express();

app.use(express.json({limit: '100kb',}));
app.use(cors());
app.use(cookieParser());
app.use(logger);
app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const PORT = process.env.PORT || 3030;
const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

import authRoutes from './routes/authRoutes.js';
app.use(authRoutes);


startServer();


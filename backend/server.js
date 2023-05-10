import express from 'express';
import cors from 'cors';
import connectMongoDB from './config/db.js';
import memberRouter from './routes/member.routes.js';
import {
  notFound,
  errorHandler,
  duplicateEmailHandler,
} from './middlewares/error.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ! Connect to MongoDB
connectMongoDB(MONGO_URI);

// ! Middlewares
app.use(express.json());
app.use(cors());

// ! Routes
app.use('/api/members', memberRouter);

// ! Error middleware
app.use(notFound);
app.use(duplicateEmailHandler);
app.use(errorHandler);

// ! Starting server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

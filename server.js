import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import bp from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import passport from 'passport';
import { passportMiddle } from './middleware/passport.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(bp.json());

app.use(passport.initialize());

passportMiddle(passport);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold));
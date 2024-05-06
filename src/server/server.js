import express from 'express';
import ViteExpress from "vite-express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactClientRoutes from './routes/contactClientRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/callback', contactClientRoutes)

app.use(notFound);
app.use(errorHandler);

ViteExpress.listen(app, 1945, () =>
  console.log("Server is listening on port 1945..."),
);
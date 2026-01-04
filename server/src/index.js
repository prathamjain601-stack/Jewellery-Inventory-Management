import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import productRoutes from './routes/product.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Core middleware
app.use(helmet());
app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'umesh-jewellers-api' });
});

// Routes
app.use('/api/products', productRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

// Start server after DB connect
async function start() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is required');
    }
    await mongoose.connect(mongoUri);
    console.log('Mongo connected');
    app.listen(port, () => console.log(`API ready on :${port}`));
  } catch (err) {
    console.error('Startup error', err.message);
    process.exit(1);
  }
}

start();

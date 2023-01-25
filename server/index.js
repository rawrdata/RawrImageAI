import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from RawrImageAI!',
    });
  });

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8081, () => console.log('Server has started on port http://localhost:8081'))
    }
    catch (error) {
        console.log('Failed mongoDB start on port http://localhost:8081')
        console.log(error);
    }
};

startServer(); 
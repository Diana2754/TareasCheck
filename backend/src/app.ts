import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/routes';
import { errorHandler } from './middlewares/error';

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api', tasksRoutes);

app.use(errorHandler);

export default app;

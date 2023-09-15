import express, { Application } from 'express';
import cors from 'cors';
import apiRouter from './api/index';
import { errorHandler, notFound } from './middlewares';

const app: Application = express();

app.set('json spaces', 2);

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.use(notFound);
app.use(errorHandler);

export default app;

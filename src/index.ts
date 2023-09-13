import express, { Application } from 'express';
import cors from 'cors';
import { logger } from './utils/logs/logger';
import apiRouter from './api/index';

const app: Application = express();
const port = process.env.PORT || 8000;

app.set('json spaces', 2);

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.listen(port, () => {
  logger.info(`Server is up and running at ${port}`);
});

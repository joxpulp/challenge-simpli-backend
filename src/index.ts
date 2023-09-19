import app from './app';
import { mongoConnect } from './services/mongodb/mongodb';
import { logger } from './utils/logs/logger';

const port = process.env.PORT || 8000;

mongoConnect();

app.listen(port, () => {
  logger.info(`Server is up and running at PORT: ${port}`);
});

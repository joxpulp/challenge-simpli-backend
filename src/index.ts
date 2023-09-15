import app from './app';
import { logger } from './utils/logs/logger';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  logger.info(`Server is up and running at PORT: ${port}`);
});

import app from './app';
import { logger } from './utils/logger';
import { config } from './config/env';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
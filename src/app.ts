import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { EventsRouter } from './presentation/router/EventsRouter';
import { BalanceRouter } from './presentation/router/BalanceRouter';
import { ResetRouter } from './presentation/router/ResetRouter';
import { databaseFactory } from './infrastructure/factories/databaseFactory';
import { responseBodyMiddleware } from './infrastructure/middlewares/responseBody.middleware';
import { requestLoggerMiddleware } from './infrastructure/middlewares/requestLoggerMiddleware';

const PORT = 3000;
const app = express();

// Create logs directory if not exist (in logger, but safe here too)
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Replace manual raw body middleware by express.json with verify option
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(responseBodyMiddleware);
app.use(requestLoggerMiddleware);

app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/ping', (_req, res) => res.json("pong"));

app.get('/openapi.yaml', (_req, res) => {
  const specPath = path.join(__dirname, '../openapi.yaml');
  res.setHeader('Content-Type', 'application/x-yaml');
  fs.createReadStream(specPath).pipe(res);
});

const database = databaseFactory('account');
app.use((new BalanceRouter()).createRoutes(database));
app.use((new ResetRouter()).createRoutes(database));
app.use((new EventsRouter()).createRoutes(database));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

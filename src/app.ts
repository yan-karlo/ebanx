import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import { EventsRouter } from './presentation/router/EventsRouter';
import { BalanceRouter } from './presentation/router/BalanceRouter';
import { ResetRouter } from './presentation/router/ResetRouter';
import { balanceControllerFactory } from '@/infrastructure/factories/balanceControllerFactory';
import { eventsControllerFactory } from '@/infrastructure/factories/eventsControllerFactory';
import { resetControllerFactory } from '@/infrastructure/factories/resetControllerFactory';
import { Database } from './infrastructure/database/Database';
import { InMemoryCRUDStrategy } from './infrastructure/database/inMemory/inMemoryCRUDStrategy';
import { Account } from './domain/entities/Account';
import { databaseFactory } from './infrastructure/factories/databaseFactory';

var app = express();
// var router = Router();
// var eventsRoutes = new EventsRouter();
// var balanceRoutes = new BalanceRouter();
// var resetRoutes = new ResetRouter();


app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: '*' }));
app.get('/ping', (_req, res) => res.json("pong"))

var CRUDStrategy = new InMemoryCRUDStrategy<Account>()
var database = databaseFactory('account');
app.use((new BalanceRouter()).createRoutes(database))
app.use((new ResetRouter()).createRoutes(database))
app.use((new EventsRouter()).createRoutes(database))
app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});

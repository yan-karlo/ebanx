import { Account } from "@/domain/entities/Account";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";
import { Database } from "@/infrastructure/database/Database";

type DBStrategy = 'memory';
type Table = 'account';

const dbStrategy: DBStrategy = (process.env.DB_STRATEGY as DBStrategy) || 'memory';

var db = {
  memory: {
    account: () => {
      var strategy = new InMemoryCRUDStrategy<Account>()
      return new Database<Account>(strategy);
    }
  },
  // oracle: {},
  // postgres:{},
}

export var databaseFactory = (table: Table) => {
  return db[dbStrategy][table]();
}
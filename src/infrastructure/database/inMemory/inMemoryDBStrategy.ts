import { Account } from "@/domain/entities/Account";

export class InMemoryDBStrategy {
  private accountsTable: Account[] = [];

  constructor() {}

  findAccountById(id: string): Account | undefined {
    return this.accountsTable.find((account) => account.id === id);
  }

  updateAccount(account: Account): Account | undefined {
    const index = this.accountsTable.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      this.accountsTable[index] = account;
      return account;
    }
  }

  createAccount(account: Account): Account {
    this.accountsTable.push(account);
    return account;
  }

  reset(): void {
    this.accountsTable = [];
  }
}

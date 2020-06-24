import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = {
    total: 0,
    income: 0,
    outcome: 0,
  };

  constructor() {
    this.transactions = [];
  }

  // lists all transactions
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  // creates transactions
  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    if (type === 'income') {
      this.balance.income += value;
    } else if (type === 'outcome') {
      this.balance.outcome += value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

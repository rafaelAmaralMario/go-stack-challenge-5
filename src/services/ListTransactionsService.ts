import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsService {
  public async execute(): Promise<Response> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance: Balance = await transactionRepository.getBalance();
    const transactions = await transactionRepository.find();

    return { transactions, balance };
  }
}

export default ListTransactionsService;

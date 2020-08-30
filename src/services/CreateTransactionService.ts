import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    if (!title || !value || !type || !category) {
      throw new AppError('You must fill all required fields.', 400);
    }

    const categoryRepository = getRepository(Category);
    let categoryTransaction = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryTransaction) {
      categoryTransaction = await categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(categoryTransaction);
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);

    const currentBalance: Balance = await transactionRepository.getBalance();

    if (type === 'outcome' && currentBalance.total - value < 0) {
      throw new AppError('Invalid Balance.', 400);
    }

    const transaction = await transactionRepository.create({
      title,
      value,
      type,
      category: categoryTransaction,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

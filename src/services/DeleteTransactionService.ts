import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_id: string;
}
class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    if (!transaction_id) {
      throw new AppError('You must enter a valid transaction.', 400);
    }
    const transactionRepository = getCustomRepository(TransactionsRepository);
    await transactionRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;

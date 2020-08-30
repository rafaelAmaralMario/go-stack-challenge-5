import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';
import CreateTransactionService from './CreateTransactionService';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  filename: string;
}

interface TrasactionToBeImport {
  title: string;
  type: string;
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    // const transactionsFilePath = path.join(uploadConfig.directory, filename);
    // const transactionsFileExists = await fs.promises.stat(transactionsFilePath);
    // const transactionsToBeImport: TrasactionToBeImport[] = [];
    // if (transactionsFileExists) {
    //   fs.createReadStream('data.csv')
    //     .pipe(csv())
    //     .on('data', data => transactionsToBeImport.push(data))
    //     .on('end', () => {
    //       const createTransaction = new CreateTransactionService();
    //       const createCategory = new CreateCategoryService();
    //       const transactions: Transaction[] = [];
    //       transactionsToBeImport.forEach(transactionToBeImport => {
    //         const category = await createCategory(
    //           transactionToBeImport.category,
    //         );

    //         createTransaction.execute(transactionToBeImport);
    //       });
    //     });
    // }
    return transactions;
  }
}

export default ImportTransactionsService;

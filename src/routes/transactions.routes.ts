import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ListTransactionsService from '../services/ListTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';

import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const listTransactions = new ListTransactionsService();
  const transactions = await listTransactions.execute();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransaction = new DeleteTransactionService();
  await deleteTransaction.execute({ transaction_id: id });

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const { filename } = request.file;
    const importTransactions = new ImportTransactionsService();
    const transactions = await importTransactions.execute({ filename });

    return response.json(transactions);
  },
);

export default transactionsRouter;

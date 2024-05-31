import { Router } from 'express';
import { validateJWT } from '../middlewares/validateJWT.middleware';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} from '../controllers/invoice.controller'


const router = Router();

router.post('/', validateJWT, createInvoice);
router.get('/', getAllInvoices);
router.get('/:id',getInvoiceById);
router.patch('/:id', validateJWT, updateInvoice);
router.delete('/:id', validateJWT, deleteInvoice);

export {router};

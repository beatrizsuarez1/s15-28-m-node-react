import { Request, Response } from 'express';
import { Invoice } from '../models/invoice.model';
import { validateFieldsInvoice, validateRequeridFieldsInvoice } from '../utils/validateInvoice';

export async function createInvoice(req: Request, res: Response) {
  try {
    const body = req.body
    console.log(body)
    const validateBodyInModel = validateFieldsInvoice(body);
    if (validateBodyInModel !== true)
      return res.status(400).json({ message: 'falta un dato en el cuerpo de la petición modelo', validateBodyInModel });
    console.log(validateBodyInModel)
    const validateRequeridBody = validateRequeridFieldsInvoice(body)
    if (validateRequeridBody !== true) return res.status(400).json({ message: ' los campos son requeridos', validateRequeridBody });
    const newinvoice = await Invoice.create(body);
    return res.status(201).json({ message: 'Factura creada correctamente', newinvoice });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'la creacion de la factura tiene tiene un error interno del Servidor' });
  }
}
export async function getAllInvoices(_req: Request, res: Response) {
  try {
    const getInvoices = await Invoice.findAll();
    if (getInvoices.length === 0) return res.status(401).json({ message: 'no existen facturas disponibles' });
    if (!getInvoices) {
      throw new Error('No se pudieron traer todas las facturas');
    }
    return res.status(200).json({
      message: 'Traes todas las facturas correctamente',
      data: getInvoices,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Listado de las faturas tiene un error interno del Servidor' })
  }
}
export async function getInvoiceById(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({
      message: 'el id es requerido',
    });
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
    res.status(200).json({ message: 'Factura encontrada con exito', data: invoice });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'La busqueda de la factura por id tiene un error interno del Servidor', error: 'Ocurrio un error desconocido' });
    }
  }
}
export async function updateInvoice(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'El id es requerido.' })
    const body = req.body
    const validate = validateFieldsInvoice(body);
    if (validate !== true) return res.status(400).json({ message: 'falta un dato en el cuerpo de la peticion', validate });
    const validateRequeridBody = validateRequeridFieldsInvoice(body)
    if (validateRequeridBody !== true) return res.status(400).json({ message: ' los campos son requeridos', validateRequeridBody });
    const invoice = await Invoice.findByPk(req.params.uuid)
    if (!invoice) return res.status(401).json({ message: 'error al traer la factura, factura no valida' })
    const updateInvoice = await invoice.update(req.body)
    return res.status(201).json({ message: 'la factura ha sido actualizada correctamente', updateInvoice })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'La actualización de la factura tiene un error interno del Servidor' })
    }
  }
}
export async function deleteInvoice(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'El id es requerido.' })
    const invoice = await Invoice.findByPk(req.params.uuid);
    if (!invoice) return res.status(401).json({ message: 'error al traer la factura, factura no valida' })
    const deleteinvoice = await invoice.destroy(req.body)
    return res.status(200).json({ message: 'La factura fue eliminada correctamente', deleteinvoice });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'La eliminación del usuario tiene un error interno del Servidor.' });
    }
  }
}

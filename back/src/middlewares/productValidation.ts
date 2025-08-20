import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import {
  productInputSchema,
  productUuidParamSchema
} from './validationSchemas';

const handleZodErrorResponse = (res: Response, error: ZodError, messagePrefix: string) => {
  return res.status(400).json({
    message: `${messagePrefix}. Verifique os dados enviados.`,
    errors: z.treeifyError(error),
  });
};

export const validateProductCreateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    productInputSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de criação de produto inválidos');
    }
    console.error('Unexpected error in validateProductCreateBody:', error);
    res.status(500).json({ message: 'Internal server error during product creation validation.' });
  }
};

export const validateProductUpdateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    productInputSchema.partial().parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de atualização de produto inválidos');
    }
    console.error('Unexpected error in validateProductUpdateBody:', error);
    res.status(500).json({ message: 'Internal server error during product update validation.' });
  }
};

export const validateProductIdParam = (req: Request, res: Response, next: NextFunction) => {
  try {
    productUuidParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'ID do produto na URL inválido');
    }
    console.error('Unexpected error in validateProductIdParam:', error);
    res.status(500).json({ message: 'Internal server error during product ID param validation.' });
  }
};
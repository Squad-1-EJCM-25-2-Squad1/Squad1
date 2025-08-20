import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { offerInputSchema, uuidParamSchema } from './validationSchemas';

const handleZodErrorResponse = (res: Response, error: ZodError, messagePrefix: string) => {
  return res.status(400).json({
    message: `${messagePrefix}. Verifique os dados enviados.`,
    errors: z.treeifyError(error),
  });
};

export const validateOfferCreateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    offerInputSchema.safeParse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de criação de oferta inválidos');
    }
    console.error('Erro inesperado no validateOfferCreateBody:', error);
    res.status(500).json({ message: 'Internal server error during offer creation validation.' });
  }
};

export const validateOfferUpdateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    offerInputSchema.partial().safeParse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de atualização de oferta inválidos');
    }
    console.error('Erro inesperado no validateOfferUpdateBody:', error);
    res.status(500).json({ message: 'Internal server error during offer update validation.' });
  }
};

export const validateOfferIdParam = (req: Request, res: Response, next: NextFunction) => {
  try {
    uuidParamSchema.safeParse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'ID da oferta na URL inválido');
    }
    console.error('Erro inesperado no validateOfferIdParam:', error);
    res.status(500).json({ message: 'Internal server error during offer ID param validation.' });
  }
};
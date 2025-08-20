import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { signupSchema, loginSchema, userIdParamSchema } from './validationSchemas';

const handleZodErrorResponse = (res: Response, error: ZodError, messagePrefix: string) => {
  return res.status(400).json({
    message: `${messagePrefix}. Verifique os dados enviados.`,
    errors: z.treeifyError(error),
  });
};

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  try {
    signupSchema.safeParse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de cadastro inválidos');
    }
    console.error('Erro inesperado na validação do cadastro:', error);
    res.status(500).json({ message: 'Internal server error during signup validation.' });
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    loginSchema.safeParse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de login inválidos');
    }
    console.error('Erro inesperado no validateLogin:', error);
    res.status(500).json({ message: 'Internal server error during login validation.' });
  }
};

export const validateUserIdParam = (req: Request, res: Response, next: NextFunction) => {
  try {
    userIdParamSchema.safeParse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'ID de usuário na URL inválido');
    }
    console.error('Erro inesperado no validateUserIdParam:', error);
    res.status(500).json({ message: 'Internal server error during user ID param validation.' });
  }
};

export const validateUserUpdateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    signupSchema.partial().safeParse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodErrorResponse(res, error, 'Dados de atualização do usuário inválidos');
    }
    console.error('Erro inesperado no validateUserUpdateBody:', error);
    res.status(500).json({ message: 'Internal server error during user update body validation.' });
  }
};
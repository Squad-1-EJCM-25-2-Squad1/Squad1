import { z } from 'zod';



export const signupSchema = z.object({
  email: z.email('Email inválido.').min(1, 'Email é obrigatório.'),
  firstName: z.string().min(1, 'Nome é obrigatório.').trim(),
  lastName: z.string().min(1, 'Sobrenome é obrigatório.').trim(),
  phone: z.string().min(10, 'Telefone inválido.').regex(/^\d+$/, 'Telefone deve conter apenas números.'),
  gender: z.enum(['Masculino', 'Feminino', 'Outro'],'Gênero inválido. Use "Masculino", "Feminino" ou "Outro".'),
  imageSrc: z.url('URL da imagem inválida.').optional(),
  birthDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Formato de data de nascimento inválido (DD-MM-YYYY).'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
});

export const loginSchema = z.object({
  email: z.email('Email inválido.').min(1, 'Email é obrigatório.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
});

export const productInputSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório.'),
  description: z.string().min(1, 'Descrição do produto é obrigatória.'),
  basePrice: z.number().positive('Preço base deve ser um número positivo.'),
  categoryId: z.number().int().positive('ID da categoria deve ser um número inteiro positivo.'),
  isActive: z.boolean().optional().default(true),
});

export const offerInputSchema = z.object({
  name: z.string().min(1, 'Nome da oferta é obrigatório.'),
  description: z.string().optional(),
  discountType: z.enum(['percentage', 'fixed'],'Tipo de desconto inválido. Use "percentage" ou "fixed".'),
  discountValue: z.number().nonnegative('Valor do desconto deve ser um número não negativo.'),
  startsAt: z.iso.datetime('Formato de YYY-MM-DDTHH:MMZ de início inválido.'),
  endsAt: z.iso.datetime('Formato de YYY-MM-DDTHH:MMZ de fim inválido.'),
  isActive: z.boolean().default(true).optional(),
})
.refine(data => new Date(data.startsAt) < new Date(data.endsAt), {
  message: "A data de início deve ser anterior à data de fim da oferta.",
  path: ["startsAt", "endsAt"],
});


// Schemas para parâmetros de rota 

export const uuidParamSchema = z.object({
  id: z.uuid("ID inválido. Deve ser um UUID válido."),
});

export const userIdParamSchema = z.object({
  user_id: z.uuid("ID do usuário inválido. Deve ser um UUID válido."),
});

export const productUuidParamSchema = z.object({
  productId: z.uuid("ID do produto inválido. Deve ser um UUID válido."),
});

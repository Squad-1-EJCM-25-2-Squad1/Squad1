import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../generated/prisma"; 

const prisma = new PrismaClient();

class VariantController {
    public async createVariant(req: Request, res: Response) {
        try {
            // Pegar os dados do corpo da requisição 
            const { price, stock, isActive, colorId, sizeId, productId } = req.body;

            if (price === undefined || stock === undefined || isActive === undefined || !colorId || !sizeId || !productId) {
                // Retorna um erro 400 se campos essenciais não estiverem presentes
                return res.status(400).json({ message: 'Todos os campos obrigatórios (price, stock, isActive, productId, colorId, sizeId) devem ser incluídos.' });
            }

            // Criação da nova variante
            const createdVariant = await prisma.variant.create({
                data: {
                    price,
                    stock,
                    isActive,
                    productId,
                    colorId,
                    sizeId
                }
            });

            // Retorna que a variante foi criada com sucesso
            res.status(201).json(createdVariant);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async readVariant(req: Request, res: Response) {
        try {
            // Pegar o id da variante
            const { id } = req.params;

            // Encontrar a variante com aquele id
            const foundVariant = await prisma.variant.findUnique({
                where: {
                    id: id
                }
            });

            if (!foundVariant) {
                // Retorna um erro 404 se a variante não for encontrada
                return res.status(404).json({ message: "Variante não encontrada." });
            }

            // Retorna que a variante foi encontrada com sucesso
            res.status(200).json(foundVariant);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async readAllVariants(req: Request, res: Response) {
        try {
            // Encontrar todas as variantes
            const foundVariants = await prisma.variant.findMany();

            // Retorna que todas as variantes foram encontradas com sucesso
            res.status(200).json(foundVariants);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateVariant(req: Request, res: Response) {
        try {
            // Pegar o id da variante
            const { id } = req.params;
            // Pegar os dados do corpo da requisição
            const { price, stock, isActive, colorId, sizeId, productId } = req.body;

            // Encontrar a variante
            const existingVariant = await prisma.variant.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se a variante foi encontrada
            if (!existingVariant) {
                return res.status(404).json({ message: 'Variante não encontrada.' });
            }

            // Atualizar os dados da variante
            const updatedVariant = await prisma.variant.update({
                where: {
                    id: id
                },
                data: {
                    price, 
                    stock, 
                    isActive, 
                    colorId, 
                    sizeId,
                    productId
                }
            });

            // Retorna que a variante foi atualizada com sucesso
            res.status(200).json(updatedVariant);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async deleteVariant(req: Request, res: Response) {
        try {
            // Pegar o id da variante
            const { id } = req.params;

            // Encontrar a variante
            const existingVariant = await prisma.variant.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se a variante foi encontrada
            if (!existingVariant) {
                return res.status(404).json({ message: 'Variante não encontrada.' });
            }

            // Deletar a variante
            const deletedVariant = await prisma.variant.delete({
                where: {
                    id: id
                }
            });

            // Retorna que a variante foi deletada com sucesso
            res.status(200).json(deletedVariant);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new VariantController();
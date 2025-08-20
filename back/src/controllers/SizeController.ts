import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../generated/prisma"; 

const prisma = new PrismaClient();

class SizeController {
    public async createSize(req: Request, res: Response) {
        try {
            // Pegar os dados do corpo da requisição
            const { label } = req.body;

            if (!label) {
                // Retorna um erro 400 se 'label' não estiver presente
                return res.status(400).json({ message: 'Tamanho deve ser incluído.' });
            }

            // Criação do novo tamanho
            const createdSize = await prisma.size.create({
                data: {
                    label
                }
            });

            // Retorna que o tamanho foi criado com sucesso
            res.status(201).json(createdSize);
        } catch (error: any) { 
            return res.status(500).json({ message: error.message });
        }
    }

    public async readSize(req: Request, res: Response) {
        try {
            // Pegar o id do tamanho
            const { id } = req.params;

            // Encontrar o tamanho com aquele id
            const foundSize = await prisma.size.findUnique({
                where: {
                    id: id
                }
            });

            if (!foundSize) {
                // Retorna um erro 404 se o tamanho não for encontrado
                return res.status(404).json({ message: "Tamanho não encontrado." });
            }

            // Retorna que o tamanho foi encontrado com sucesso
            res.status(200).json(foundSize);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async readAllSizes(req: Request, res: Response) {
        try {
            // Encontrar todos os tamanhos
            const foundSizes = await prisma.offer.findMany();

            // Retorna que todos os tamanhos foram encontrados com sucesso
            res.status(200).json(foundSizes);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateSize(req: Request, res: Response) {
        try {
            // Pegar o id do tamanho
            const { id } = req.params;
            // Pegar os dados do corpo da requisição
            const { label } = req.body;

            // Encontrar o tamanho
            const existingSize = await prisma.size.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se o tamanho foi encontrado
            if (!existingSize) {
                return res.status(404).json({ message: 'Tamanho não encontrado.' });
            }

            // Atualizar os dados do tamanho
            const updatedSize = await prisma.size.update({
                where: {
                    id: id
                },
                data: { label }
            });

            // Retorna que o tamanho foi atualizado com sucesso
            res.status(200).json(updatedSize);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async deleteSize(req: Request, res: Response) {
        try {
            // Pegar o id do tamanho
            const { id } = req.params;

            // Encontrar o tamanho
            const existingSize = await prisma.size.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se o tamanho foi encontrado
            if (!existingSize) {
                return res.status(404).json({ message: 'Tamanho não encontrado.' });
            }

            // Deletar o tamanho
            const deletedSize = await prisma.size.delete({
                where: {
                    id: id
                }
            });

            // Retorna que o tamanho foi deletado com sucesso 
            res.status(200).json(deletedSize);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new SizeController();
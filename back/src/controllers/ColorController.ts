import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

class ColorController {
    public async createColor(req: Request, res: Response) {
        try {
            // Pegar os dados do corpo da requisição
            const { name, hexCode } = req.body;

            if (!name || !hexCode) {
                // Retorna um erro 400 se name ou hexCode não estiverem presentes
                return res.status(400).json({ message: 'Nome e hex code devem ser incluídos.' });
            }

            // Criação da nova cor 
            const createdColor = await prisma.color.create({
                data: {
                    name, 
                    hexCode
                } 
            });

            // Retorna que a cor foi criada com sucesso
            res.status(201).json(createdColor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async readColor(req: Request, res: Response) {
        try {
            // Pegar o id da cor
            const { id } = req.params;

            // Encontrar a cor com aquele id
            const foundColor = await prisma.color.findUnique({
                where: {
                    id: id
                }
            });

            if (!foundColor) {
                // Retorna um erro 404 se color não estiver presente
                return res.status(404).json({ message: "Cor não encontrada." });
            }

            // Retorna que a cor foi encontrada com sucesso
            res.status(200).json(foundColor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async readAllColors(req: Request, res: Response) {
        try {
            // Encontrar todas as cores
            const foundColors = await prisma.offer.findMany();
    
            // Retorna que todas as cores foram encontradas com sucesso
            res.status(200).json(foundColors);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateColor(req: Request, res: Response) {
        try {
            // Pegar o id da cor
            const { id } = req.params;
            // Pegar os dados do corpo da requisição
            const {name, hexCode} = req.body;

            // Encontrar a cor 
            const existingColor = await prisma.color.findUnique({ 
                where: { 
                    id: id 
                } 
            });

            // Verificar se a cor foi encontrada
            if (!existingColor){
                return res.status(404).json({ message: 'Cor não encontrada.' });
            } 

            // Atualizar os dados da cor
            const updatedColor = await prisma.color.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    hexCode
                }
            });

            // Retorna que a cor foi atualizada com sucesso
            res.status(200).json(updatedColor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deleteColor(req: Request, res: Response) {
        try {
            // Pegar o id da cor
            const { id } = req.params;

            // Encontrar a cor 
            const existingColor = await prisma.color.findUnique({ 
                where: { 
                    id: id 
                } 
            });

            // Verificar se a cor foi encontrada
            if (!existingColor){
                return res.status(404).json({ message: 'Cor não encontrada.' });
            } 

            // Deletar a cor
            const deletedColor = await prisma.color.delete({
                where: {
                    id: id
                }
            });

            // Retorna que a cor foi deletada com sucesso
            res.status(200).json(deletedColor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ColorController();
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../generated/prisma"; 

const prisma = new PrismaClient();

class OfferController {
    public async createOffer(req: Request, res: Response) {
        try {
            // Pegar os dados do corpo da requisição 
            const { name, description, discountType, discountValue, startsAt, endsAt, isActive, productId } = req.body;

            if (!name || !discountType || discountValue === undefined || isActive === undefined || !startsAt || !endsAt || !productId ) {
                // Retorna um erro 400 se campos essenciais não estiverem presentes
                return res.status(400).json({ message: 'Nome, tipo de desconto, valor de desconto, data de início, data de fim e ID do produto são campos obrigatórios.' });
            }

            // Converter datas para Date
            const startDate = new Date(startsAt);
            const endDate = new Date(endsAt);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                // Retorna um erro 400 se o formato da data for inválido
                return res.status(400).json({ message: 'Formato de data inválido para startsAt ou endsAt.' });
            }

            if (startDate >= endDate) {
                // Retorna um erro 400 se a data de início não for anterior à data de fim
                return res.status(400).json({ message: 'A data de início deve ser anterior à data de fim da oferta.' });
            }

            // Criação da nova oferta (productId)
            const createdOffer = await prisma.offer.create({
                data: {
                    name,
                    description,
                    discountType,
                    discountValue,
                    startsAt: startDate,
                    endsAt: endDate,
                    isActive: isActive ?? true, // Define como true se não for fornecido
                    productId
                }
            });

            // Retorna que a oferta foi criada com sucesso
            res.status(201).json(createdOffer);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async readOffer(req: Request, res: Response) {
        try {
            // Pegar o id da oferta
            const { id } = req.params;

            // Encontrar a oferta com aquele id
            const foundOffer = await prisma.offer.findUnique({
                where: {
                    id: id
                }
            });

            if (!foundOffer) {
                // Retorna um erro 404 se a oferta não for encontrada
                return res.status(404).json({ message: "Oferta não encontrada." });
            }

            // Retorna que a oferta foi encontrada com sucesso
            res.status(200).json(foundOffer);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async readAllOffers(req: Request, res: Response) {
        try {
            // Encontrar todas as ofertas
            const foundOffers = await prisma.offer.findMany();

            // Retorna que todas as ofertas foram encontradas com sucesso
            res.status(200).json(foundOffers);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateOffer(req: Request, res: Response) {
        try {
            // Pegar o id da oferta
            const { id } = req.params;
            // Pegar os dados do corpo da requisição 
            const { name, description, discountType, discountValue, startsAt, endsAt, isActive, productId } = req.body;

            // Encontrar a oferta
            const existingOffer = await prisma.offer.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se a oferta foi encontrada
            if (!existingOffer) {
                return res.status(404).json({ message: 'Oferta não encontrada.' });
            }

            if(startsAt !== undefined && endsAt !== undefined){
                if (startsAt >= endsAt) {
                    // Retorna um erro 400 se a data de início não for anterior à data de fim
                    return res.status(400).json({ message: 'A data de início deve ser anterior à data de fim da oferta.' });
                }
            }   

            // Atualizar os dados da oferta
            const updatedOffer = await prisma.offer.update({
                where: {
                    id: id
                },
                data: {
                    name, 
                    description, 
                    discountType, 
                    discountValue, 
                    startsAt, 
                    endsAt, 
                    isActive,
                    productId
                }
            });

            // Retorna que a oferta foi atualizada com sucesso
            res.status(200).json(updatedOffer);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async deleteOffer(req: Request, res: Response) {
        try {
            // Pegar o id da oferta
            const { id } = req.params;

            // Encontrar a oferta
            const existingOffer = await prisma.offer.findUnique({
                where: {
                    id: id
                }
            });

            // Verificar se a oferta foi encontrada
            if (!existingOffer) {
                return res.status(404).json({ message: 'Oferta não encontrada.' });
            }

            // Deletar a oferta
            const deletedOffer = await prisma.offer.delete({
                where: {
                    id: id
                }
            });

            // Retorna que a oferta foi deletada com sucesso
            res.status(200).json(deletedOffer);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

}

export default new OfferController();
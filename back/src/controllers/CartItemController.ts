import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

class CartItemController {
    public async createCartItem(req: Request, res: Response) {
        try {
            // Pegar os dados do corpo da requisição
            const { cartId, productId, quantity } = req.body;

            if (!cartId || !productId) {
                // Retorna um erro 400 se cartId ou productId não estiverem presentes
                return res.status(400).json({ message: 'Cart ID e Product ID devem ser incluídos.' });
            }

            // Verificar se o cart existe
            const existingCart = await prisma.cart.findUnique({
                where: { id: cartId }
            });

            if (!existingCart) {
                return res.status(404).json({ message: 'Carrinho não encontrado.' });
            }

            // Verificar se o produto existe
            const existingProduct = await prisma.product.findUnique({
                where: { id: productId }
            });

            if (!existingProduct) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            // Criação do novo item do carrinho
            const createdCartItem = await prisma.cartItem.create({
                data: {
                    cartId,
                    productId,
                    quantity: quantity || 1
                },
                include: {
                    cart: true,
                    product: true
                }
            });

            // Retorna que o item do carrinho foi criado com sucesso
            res.status(201).json(createdCartItem);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async readCartItem(req: Request, res: Response) {
        try {
            // Pegar o id do item do carrinho
            const { id } = req.params;

            // Encontrar o item do carrinho com aquele id
            const foundCartItem = await prisma.cartItem.findUnique({
                where: {
                    id: id
                },
                include: {
                    cart: true,
                    product: true
                }
            });

            if (!foundCartItem) {
                // Retorna um erro 404 se cartItem não estiver presente
                return res.status(404).json({ message: "Item do carrinho não encontrado." });
            }

            // Retorna que o item do carrinho foi encontrado com sucesso
            res.status(200).json(foundCartItem);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async readAllCartItems(req: Request, res: Response) {
        try {
            // Encontrar todos os itens do carrinho
            const foundCartItems = await prisma.cartItem.findMany({
                include: {
                    cart: true,
                    product: true
                }
            });
    
            // Retorna que todos os itens do carrinho foram encontrados com sucesso
            res.status(200).json(foundCartItems);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateCartItem(req: Request, res: Response) {
        try {
            // Pegar o id do item do carrinho
            const { id } = req.params;
            // Pegar os dados do corpo da requisição
            const { quantity } = req.body;

            // Encontrar o item do carrinho
            const existingCartItem = await prisma.cartItem.findUnique({ 
                where: { 
                    id: id 
                } 
            });

            // Verificar se o item do carrinho foi encontrado
            if (!existingCartItem){
                return res.status(404).json({ message: 'Item do carrinho não encontrado.' });
            } 

            // Validar se pelo menos um campo foi fornecido para atualização
            if (quantity === undefined || quantity === null) {
                return res.status(400).json({ 
                    message: 'Quantidade deve ser fornecida para atualização.' 
                });
            }

            // Validar se a quantidade é um número positivo
            if (typeof quantity !== 'number' || quantity < 1) {
                return res.status(400).json({ 
                    message: 'Quantidade deve ser um número positivo maior que zero.' 
                });
            }

            // Atualizar os dados do item do carrinho
            const updatedCartItem = await prisma.cartItem.update({
                where: {
                    id: id
                },
                data: {
                    quantity: quantity
                },
                include: {
                    cart: true,
                    product: true
                }
            });

            // Retorna que o item do carrinho foi atualizado com sucesso
            res.status(200).json(updatedCartItem);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deleteCartItem(req: Request, res: Response) {
        try {
            // Pegar o id do item do carrinho
            const { id } = req.params;

            // Encontrar o item do carrinho
            const existingCartItem = await prisma.cartItem.findUnique({ 
                where: { 
                    id: id 
                } 
            });

            // Verificar se o item do carrinho foi encontrado
            if (!existingCartItem){
                return res.status(404).json({ message: 'Item do carrinho não encontrado.' });
            } 

            // Deletar o item do carrinho
            const deletedCartItem = await prisma.cartItem.delete({
                where: {
                    id: id
                }
            });

            // Retorna que o item do carrinho foi deletado com sucesso
            res.status(200).json(deletedCartItem);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CartItemController();
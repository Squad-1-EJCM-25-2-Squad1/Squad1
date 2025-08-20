import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();


export class OrderController {

  // Criar um novo pedido
  public static async createOrder(req: Request, res: Response) {
    try {
      const { userId, address, products } = req.body;

      // Validar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Calcular o custo total e validar produtos
      let totalCost = 0;
      for (const product of products) {
        const productData = await prisma.product.findUnique({
          where: { id: product.productId }
        });
        
        if (!productData) {
          return res.status(404).json({ error: `Produto ${product.productId} não encontrado` });
        }
        
        // Converter Decimal para Number para cálculos
        const basePrice = Number(productData.basePrice);
        totalCost += basePrice * product.quantity;
      }

      // Criar o pedido
      const order = await prisma.order.create({
        data: {
          userId: userId,
          address,
          totalCost: totalCost
        }
      });

      // Criar os produtos do pedido
      for (const product of products) {
        await prisma.orderProduct.create({
          data: {
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            unitPrice: Number(product.unitPrice || 0)
          }
        });
      }

      // Buscar o pedido completo com relacionamentos
      const completeOrder = await prisma.order.findUnique({
        where: { id: order.id },
        include: {
          user: true,
          orderProducts: {
            include: {
              product: true
            }
          }
        }
      });

      res.status(201).json(completeOrder);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar pedidos por usuário
  public static async getOrdersByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const orders = await prisma.order.findMany({
        where: { userId: userId },
        include: {
          orderProducts: {
            include: {
              product: true
            }
          }
        },
        orderBy: { dateOrdered: 'desc' }
      });

      res.json(orders);
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar pedido por ID
  public static async getOrderById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderProducts: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json(order);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar status do pedido
  public static async updateOrderStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: {
          orderProducts: {
            include: {
              product: true
            }
          }
        }
      });

      res.json(order);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Adicionar produto a um pedido existente
  public static async addProductToOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { productId, quantity, unitPrice } = req.body;

      // Verificar se o pedido existe
      const order = await prisma.order.findUnique({
        where: { id: orderId }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      // Verificar se o produto existe
      const product = await prisma.product.findUnique({
        where: { id: productId }
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Adicionar produto ao pedido
      const orderProduct = await prisma.orderProduct.create({
        data: {
          orderId: orderId,
          productId: productId,
          quantity: parseInt(quantity),
          unitPrice: Number(unitPrice)
        },
        include: {
          product: true
        }
      });

      // Recalcular o custo total do pedido
      const allOrderProducts = await prisma.orderProduct.findMany({
        where: { orderId: orderId }
      });

      let newTotalCost = 0;
      for (const op of allOrderProducts) {
        newTotalCost += Number(op.unitPrice) * op.quantity;
      }

      // Atualizar o custo total do pedido
      await prisma.order.update({
        where: { id: orderId },
        data: { totalCost: newTotalCost }
      });

      res.status(201).json(orderProduct);
    } catch (error) {
      console.error('Erro ao adicionar produto ao pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Remover produto de um pedido
  public static async removeProductFromOrder(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params;

      // Verificar se o produto existe no pedido
      const orderProduct = await prisma.orderProduct.findUnique({
        where: {
          orderId_productId: {
            orderId: orderId,
            productId: productId
          }
        }
      });

      if (!orderProduct) {
        return res.status(404).json({ error: 'Produto não encontrado no pedido' });
      }

      // Remover o produto do pedido
      await prisma.orderProduct.delete({
        where: {
          orderId_productId: {
            orderId: orderId,
            productId: productId
          }
        }
      });

      // Recalcular o custo total do pedido
      const remainingOrderProducts = await prisma.orderProduct.findMany({
        where: { orderId: orderId }
      });

      let newTotalCost = 0;
      for (const op of remainingOrderProducts) {
        newTotalCost += Number(op.unitPrice) * op.quantity;
      }

      // Atualizar o custo total do pedido
      await prisma.order.update({
        where: { id: orderId },
        data: { totalCost: newTotalCost }
      });

      res.json({ message: 'Produto removido do pedido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover produto do pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Listar todos os pedidos
  public static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          orderProducts: {
            include: {
              product: true
            }
          }
        },
        orderBy: { dateOrdered: 'desc' }
      });

      res.json(orders);
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default OrderController;

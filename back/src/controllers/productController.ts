// src/controllers/product.controller.ts
import { PrismaClient, Prisma } from '../generated/prisma';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class ProductController {

  // Criar produto
  public static async create(req: Request, res: Response) {
    try {
      const { name, description, basePrice, categoryId } = req.body;

      if (!name || !description || !basePrice || !categoryId) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          basePrice: new Prisma.Decimal(basePrice),
          category: { connect: { id: categoryId } }
        },
        include: {
          images: true,
          variants: { include: { color: true, size: true } },
          offer: true,
          category: true
        }
      });

      res.status(201).json(product);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Listar todos os produtos (sem paginação)
  public static async readAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: {
          images: true,
          reviews: true,
          variants: { include: { color: true, size: true } },
          offer: true,
          category: true
        },
      });

      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: 'Error to find products' });
    }
  }

  // Buscar produto por ID
  public static async readProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const foundProduct = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          images: true,
          reviews: true,
          variants: { include: { color: true, size: true } },
          offer: true,
          category: true
        },
      });

      if (!foundProduct) {
        return res.status(404).json({ message: "Product Not Found" });
      }

      res.status(200).json(foundProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Atualizar produto
  public static async update(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const { name, description, basePrice, isActive, categoryId } = req.body;

      const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product Not Found' });
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          basePrice: basePrice ? new Prisma.Decimal(basePrice) : undefined,
          isActive,
          category: categoryId ? { connect: { id: categoryId } } : undefined,
        },
        include: {
          images: true,
          reviews: true,
          variants: { include: { color: true, size: true } },
          offer: true,
          category: true
        },
      });

      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Deletar produto
  public static async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product Not Found' });
      }

      const deletedProduct = await prisma.product.delete({ where: { id: productId } });

      res.status(200).json(deletedProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Upload de imagem
  public static async uploadImage(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
      }

      const imagePath = `/uploads/photos/${req.file.filename}`;

      const newImage = await prisma.productImage.create({
        data: {
          imageUrl: imagePath,
          productId: productId,
          isMain: false
        }
      });

      res.status(200).json({ message: "Successfully image adding", image: newImage });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Adicionar produtos a uma oferta existente
  public static async addProductsToOffer(req: Request, res: Response) {
    try {
      const { offerId } = req.params;
      const { productIds } = req.body;

      if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).json({ error: "productIds must be an array" });
      }

      const updatedOffer = await prisma.offer.update({
        where: { id: offerId },
        data: {
          products: {
            connect: productIds.map((id: string) => ({ id }))
          }
        },
        include: { products: true }
      });

      res.status(200).json(updatedOffer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
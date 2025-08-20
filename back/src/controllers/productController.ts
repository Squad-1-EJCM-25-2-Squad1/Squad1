// src/controllers/product.controller.ts
import { PrismaClient, Prisma } from '../generated/prisma';
import { Request, Response } from 'express';
import { Param } from '../generated/prisma/runtime/library';

const prisma = new PrismaClient();

export class ProductController {

    public static async create(req: Request, res: Response) {
        
        try {
            const { 
                name, 
                description, 
                basePrice, 
                categoryId } = req.body;
    
            if (!name || !description || !basePrice || !categoryId) {
                return res.status(400).json({ error: 'Required fields are missing' });
            }
            
            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    basePrice,
                    category: {
                        connect: { 
                            id: categoryId 
                        },
                    },
                },
                include: {
                    category: true,
                },
            });

            res.status(201).json(product);
        } catch (error:any) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    public static async readAll(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany({
                include: {
                    category: true,
                    images: true,
                    reviews: true,
                    variants: {
                        include: { 
                            color: true,
                            size: true,
                        },
                    },
                    offers: { 
                        include: {
                        },
                    },   
                },
            });

            res.json(products);
        } catch (error:any) {
            res.status(500).json({ error: 'Error to find products' });
        }
    }


    public static async readProduct(req: Request, res: Response){
        try{
            const { productId } = req.params;

            const foundProduct = await prisma.product.findUnique({
                where: { id: productId},
                include: {
                    category: true,
                    images: true,
                    reviews: true,
                    variants: {
                        include: { 
                            color: true,
                            size: true,
                        },
                    },
                    offers: { 
                        include: {
                        },
                    },   
                },
            });

            if(!foundProduct){
                return res.status(400).json({ message: "Product Not Found"});
            }

            res.status(200).json(foundProduct);
        }catch (error:any){
            res.status(500).json({ message: error.message});
        }
    }

    public static async update(req: Request, res: Response) {
        try{
            const { productId } = req.params;
            const {
                name,
                description,
                basePrice,
                isActive,
                categoryId
            } = req.body;

            const existingProduct = await prisma.product.findUnique({ 
                where: { 
                    id: productId 
                } 
            });

            if (!existingProduct){
                return res.status(404).json({ error: 'Product Not Found' });
            } 

            const updatedProduct = await prisma.product.update({
                where: { id: productId },
                data: {
                    name,
                    description,
                    basePrice,
                    isActive,
                    ...(categoryId && { category: { connect: { id: categoryId } } }),
                },
                include: {
                    category: true,
                    images: true,
                    reviews: true,
                    variants: {
                        include: { 
                            color: true,
                            size: true,
                        },
                    },
                    offers: { 
                        include: {
                        },
                    },   
                },
            });
            
            res.status(200).json(updatedProduct);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async deleteProduct (req: Request, res: Response){
        try{
            const { productId } = req.params;

            const existingProduct = await prisma.product.findUnique({ 
                where: { 
                    id: productId 
                } 
            });

            if (!existingProduct){
                return res.status(404).json({ error: 'Product Not Found' });
            }  

            const deleteProduct = await prisma.product.delete({
                where: {id: productId}
            });

            res.status(200).json(deleteProduct);
        }catch(error:any){
            res.status(500).json({ message: error.message });
        }
    }


    public static async uploadImage(req: Request, res: Response) {
        try {
            const { productId } = req.params;

            if (!req.file) {
            return res.status(400).json({ message: "Nenhum arquivo enviado." });
            }

            const imagePath = `/uploads/photos/${req.file.filename}`;

            // Criar nova imagem associada ao produto
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

}
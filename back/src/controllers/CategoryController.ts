import { PrismaClient } from '../generated/prisma';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class CategoryController {

    // Create category
    public static async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: "The 'name' field is required" });
        }

        const category = await prisma.category.create({
            data: { name }
        });

            return res.status(201).json(category);
        } catch (error: any) {
            if (error.code === "P2002") {
                return res.status(409).json({ error: "A category with this name already exists" });
        }
            return res.status(500).json({ error: "Error creating category" });
        }
    }

    // Get category by ID
    public static async read(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const category = await prisma.category.findUnique({
                where: { id },
                include: { products: true }
            });

            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching category" });
        }
    }

    // Get all categories
    public static async readAll(_req: Request, res: Response) {
        try {
            const categories = await prisma.category.findMany({
                include: { products: true },
                orderBy: { name: "asc" }
            });

            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching categories" });
        }
    }

    // Update category
    public static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: "The 'name' field is required" });
            }

            const category = await prisma.category.update({
                where: { id },
                data: { name }
            });

            return res.json(category);
        } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Category not found" });
        }
            return res.status(500).json({ error: "Error updating category" });
        }
    }

    // Delete category
    public static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.category.delete({
                where: { id }
            });

            return res.json({ message: "Category deleted successfully" });

        } catch (error: any) {
            if (error.code === "P2025") {
                return res.status(404).json({ error: "Category not found" });
            }
            return res.status(500).json({ error: "Error deleting category" });
        }
    }

    // Populate default categories
    public static async populateDefaults(_req: Request, res: Response) {
        const defaultCategories = [
            { name: "Tops" },
            { name: "Bottoms" },
            { name: "Dresses" },
            { name: "Shoes" },
            { name: "Accessories" }
        ];

        try {
            for (const category of defaultCategories) {
                await prisma.category.upsert({
                    where: { name: category.name },
                    update: {},
                    create: category
                });
        }

            return res.json({ message: "Default categories populated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Error populating default categories" });
        }
    }

    // controllers/CategoryController.ts
    public static async getProductsByCategories(req: Request, res: Response) {
        try {
            // Expecting ?ids=id1,id2,id3
            const idsParam = req.query.ids as string;

            if (!idsParam) {
                return res.status(400).json({ error: "The 'ids' query parameter is required" });
            }

            const categoryIds = idsParam.split(',').map(id => id.trim());

            const products = await prisma.product.findMany({
                where: {
                    categoryId: { in: categoryIds }
                },
                include: {
                    category: true,
                    images: true,
                    variants: true
                }
            });

            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching products by categories" });
        }
    }

}

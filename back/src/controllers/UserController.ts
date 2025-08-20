import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import auth from "../config/auth";

const prisma = new PrismaClient();

export class UserController {
  public static async signup(request: Request, response: Response) {
    try {
      const {
        firstName,
        lastName,
        imageSrc,
        gender,
        email,
        birthDate,
        phone,
        password,
      } = request.body;
      
      const { hash, salt } = auth.generatePassword(password);

      const createdUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          birthDate,
          phone,
          imageSrc,
          gender,
          hash,
          salt,
          cart: { create: {} },
          wishlist: { create: {} }
        },
        include: { cart: true, wishlist: true }
      });

      if (!createdUser) {
        return response.status(404).json();
      }

      response.status(201).json(createdUser);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user)
        return response.status(400).json({ message: "usuario não existente" });

      const { hash, salt } = user;

      if (!auth.checkPassword(password, hash, salt)) {
        return response.status(400).json({ message: "Senha incorreta" });
      }
      const token = auth.generateJWT(user);

      return response.status(201).json({ message: "Login completo", token: token});
    } catch (error) {
      return response.status(500).json();
    }
  }

  public static async readUser(request: Request, response: Response) {
    try {
      const { userId }  = request.params;

      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            wishlist: true,
            cart: true,
            orders: true,
            reviews: true,
          },
        });
        return response.status(201).json(foundUser);
      } catch (err) {
        return response.status(400).json("Usuário não encontrado");
      }
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public static async deleteUser(request: Request, response: Response) {
    try {
      const { userId }  = request.params;

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      response.status(200).json(deletedUser);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateUser(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const { firstName, lastName, imageSrc, gender, email, birthDate, phone } =
        request.body;

      const createInput: Prisma.UserUpdateInput = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthDate: birthDate,
        phone: phone,
        imageSrc: imageSrc,
        gender: gender,
      };

      const updatedUser = await prisma.user.update({
        data: createInput,
        where: {
          id: userId,
        },
      });

      response.status(200).json(updatedUser);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllUsers(request: Request, response: Response) {
    try {
      const users = await prisma.user.findMany({});

      response.status(200).json(users);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readMe(request: Request, response: Response) {
    try {
      const userId  = request.user as string;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          cart: true,
          wishlist: true,
          orders: true,
          reviews: true,
        },
      });

      if (!user) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      return response.status(200).json(user);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}

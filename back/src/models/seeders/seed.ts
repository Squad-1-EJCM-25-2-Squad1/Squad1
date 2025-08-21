// prisma/seed.ts
import { PrismaClient } from '../../generated/prisma'; 
import { userSeeder } from './UserSeeder'; 
import { productSeeder } from './ProductSeeder'; 
import { orderSeeder } from './OrderSeeder'; 

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando o seeding de dados...');

    // Chamada dos seeders:
    await userSeeder(prisma, 5);
    await productSeeder(prisma); // Chame o seeder de produtos
    await orderSeeder(prisma, 3);
}

main()
    .then(() => {
        console.log('Seeding concluído com sucesso.');
    })
    .catch((error) => {
        console.error('Erro durante o seeding:', error);
        process.exit(1); // Garante que o processo saia com erro em caso de falha
    })
    .finally(async () => {
        await prisma.$disconnect(); // Garante que a conexão Prisma seja fechada
    });
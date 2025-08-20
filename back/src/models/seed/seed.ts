import { PrismaClient } from '../../generated/prisma';
import { userSeeder } from './UserSeeder';
//import { productSeeder } from './ProductSeeder';
import { orderSeeder } from './OrderSeeder';

const prisma = new PrismaClient();

async function main() { 

    // Chamada dos seeders:
    await userSeeder(prisma, 5);    
   //await productSeeder(prisma, 10);
    await orderSeeder(prisma, 3);  
}

main()
    .then(() => {
        console.log('Seeding completed successfully.');
    })
    .catch((error) => {
        console.error('Error during seeding:', error);
    });
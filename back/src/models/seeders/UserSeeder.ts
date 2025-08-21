import { Prisma, PrismaClient } from '../../generated/prisma'; 
import { fakerPT_BR } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

// Função que cria um número especificado de usuários no banco de dados.
export async function userSeeder(prisma: PrismaClient, numUsers: number): Promise<Prisma.UserGetPayload<any>[]> {
    console.log(`- Criando ${numUsers} usuários no DB...`);
    const usersToCreate: Prisma.UserCreateInput[] = [];

    for (let i = 0; i < numUsers; i++) {
        const userId = uuidv4();
        const birthDate = fakerPT_BR.date.birthdate({ min: 18, max: 65, mode: 'age' });
        const formattedBirthDate = birthDate.toISOString(); // Formato 'YYYY-MM-DD'

        usersToCreate.push({
            id: userId,
            email: fakerPT_BR.internet.email().toLowerCase(),
            firstName: fakerPT_BR.person.firstName(),
            lastName: fakerPT_BR.person.lastName(),
            phone: fakerPT_BR.phone.number({ style: 'national' }), 
            gender: fakerPT_BR.helpers.arrayElement(['Masculino', 'Feminino', 'Outro']),
            imageSrc: fakerPT_BR.image.avatar(),
            birthDate: formattedBirthDate,
            hash: fakerPT_BR.string.alphanumeric(10), 
            salt: fakerPT_BR.string.alphanumeric(10),  
        });
    }

    // Insere todos os usuários gerados no banco de dados
    await prisma.user.createMany({ data: usersToCreate });
    console.log(`- ${usersToCreate.length} usuários foram inseridos no DB.`);

    // Retorna os objetos User completos que foram criados.
    // Isso é útil se outros seeders precisarem dos IDs reais dos usuários.
    const createdUsers = await prisma.user.findMany({
        where: { id: { in: usersToCreate.map(u => u.id as string) } }
    });

    return createdUsers; // Retorna os usuários criados
}
import { Prisma, PrismaClient } from '../../generated/prisma';
import { fakerPT_BR } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export async function offerSeeder(
  prisma: PrismaClient,
  numOffers: number
): Promise<Prisma.OfferGetPayload<any>[]> {
  console.log(`- Criando ${numOffers} ofertas no DB...`);

  const createdOffers: Prisma.OfferGetPayload<any>[] = [];

  for (let i = 0; i < numOffers; i++) {
    const offer = await prisma.offer.create({
      data: {
        id: uuidv4(),
        createdAt: new Date(),
        name: fakerPT_BR.commerce.product(),
        description: fakerPT_BR.lorem.sentence(),
        discountType: fakerPT_BR.helpers.arrayElement(['PERCENTAGE', 'FIXED']),
        discountValue: new Prisma.Decimal(fakerPT_BR.number.float({ min: 5, max: 50 })),
        startsAt: new Date(),
        endsAt: fakerPT_BR.date.future({ years: 1 }),
        isActive: fakerPT_BR.datatype.boolean({ probability: 0.8 }),
      },
    });

    createdOffers.push(offer);
  }

  console.log(`- ${createdOffers.length} ofertas foram inseridas no DB.`);
  return createdOffers;
}

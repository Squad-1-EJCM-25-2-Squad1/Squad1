import { Prisma, PrismaClient } from '../../generated/prisma';
import { fakerPT_BR } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

/**
 * Função que cria produtos fake no banco de dados.
 * - Valida se há categorias já criadas (necessárias para os products).
 * - Gera preço, descrição, data de criação e vínculo com categoria.
 */
export async function productSeeder(
  prisma: PrismaClient,
  numProducts: number
): Promise<Prisma.ProductGetPayload<any>[]> {
  console.log(`- Criando ${numProducts} produtos no DB...`);

  // Primeiro checamos se há categorias já cadastradas, pois Product depende delas
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    throw new Error('⚠️ Nenhuma categoria encontrada. Crie categorias antes de rodar o productSeeder.');
  }

  const offers = await prisma.offer.findMany(); // pega todas as ofertas
  if(offers.length === 0){
    throw new Error('⚠️ Nenhuma oferta encontrada. Crie ofertas antes de rodar o productSeeder.')
  }

  const productsToCreate: Prisma.ProductCreateManyInput[] = [];

  for (let i = 0; i < numProducts; i++) {
    const productId = uuidv4();
    const randomCategory = fakerPT_BR.helpers.arrayElement(categories); // pega uma categoria existente
    const randomOffer = fakerPT_BR.datatype.boolean({ probability: 0.3 })
      ? fakerPT_BR.helpers.arrayElement(offers).id
      : null;
    const price = parseFloat(fakerPT_BR.commerce.price({ min: 20, max: 500, dec: 2 }));


    productsToCreate.push({
      id: productId,
      name: fakerPT_BR.commerce.productName(),
      description: fakerPT_BR.commerce.productDescription(),
      basePrice: new Prisma.Decimal(price),
      isActive: fakerPT_BR.datatype.boolean({ probability: 0.9 }), // 90% chance de estar ativo
      createdAt: fakerPT_BR.date.past({ years: 1 }),

      // relação obrigatória: Category
      categoryId: randomCategory.id,

      offerId: randomOffer,
    });
  }

  // Insere os produtos
  for (const product of productsToCreate) {
    await prisma.product.create({ data: product });
}
  console.log(`- ${productsToCreate.length} produtos foram inseridos no DB.`);

  // Retorna os objetos criados (completa os dados do DB)
  const createdProducts = await prisma.product.findMany({
    where: { id: { in: productsToCreate.map(p => p.id as string) } },
  });

  return createdProducts;
}

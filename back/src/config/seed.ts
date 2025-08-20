// prisma/seed.ts
import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

async function ensureCategory(name: string) {
  const found = await prisma.category.findFirst({ where: { name } });
  if (found) return found;
  return prisma.category.create({ data: { name } });
}

async function ensureColor(name: string, hexCode: string) {
  const found = await prisma.color.findFirst({ where: { name } });
  if (found) return found;
  return prisma.color.create({ data: { name, hexCode } });
}

async function ensureSize(label: string) {
  const found = await prisma.size.findFirst({ where: { label } });
  if (found) return found;
  return prisma.size.create({ data: { label } });
}

async function ensureProduct(p: {
  name: string;
  description: string;
  basePrice: Prisma.Decimal;
  categoryId: string;
  images: string[];
}) {

  let product = await prisma.product.findFirst({
    where: { name: p.name, categoryId: p.categoryId },
  });

  if (!product) {
    product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        basePrice: p.basePrice,
        categoryId: p.categoryId,
      },
    });
  }

  
  for (let i = 0; i < p.images.length; i++) {
    const imageUrl = p.images[i];
    const exists = await prisma.productImage.findFirst({
      where: { productId: product.id, imageUrl },
    });
    if (!exists) {
      await prisma.productImage.create({
        data: { productId: product.id, imageUrl, isMain: i === 0 },
      });
    }
  }

  return product;
}

async function ensureVariant(productId: string, colorId: string, sizeId: string, price: Prisma.Decimal) {
  const found = await prisma.variant.findFirst({
    where: { productId, colorId, sizeId },
  });
  if (found) return found;

  return prisma.variant.create({
    data: {
      productId,
      colorId,
      sizeId,
      price,
      stock: Math.floor(Math.random() * 20) + 5,
      isActive: true,
    },
  });
}

async function ensureOffer(data: {
  name: string;
  description?: string | null;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: Prisma.Decimal;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
}) {
  let offer = await prisma.offer.findFirst({ where: { name: data.name } });
  if (!offer) {
    offer = await prisma.offer.create({ data });
  }
  return offer;
}

async function main() {
  //Categorias default
  const categoriesWanted = ["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];
  const categoryMap: Record<string, string> = {};
  for (const name of categoriesWanted) {
    const c = await ensureCategory(name);
    categoryMap[name] = c.id;
  }

  //Cores e tamanhos
  const colorsWanted: Array<[string, string]> = [
    ["Preto", "#000000"],
    ["Branco", "#FFFFFF"],
    ["Azul", "#1E40AF"],
    ["Vermelho", "#DC2626"],
  ];
  const sizesWanted = ["P", "M", "G"];

  const colorMap: Record<string, string> = {};
  for (const [name, hex] of colorsWanted) {
    const c = await ensureColor(name, hex);
    colorMap[name] = c.id;
  }

  const sizeMap: Record<string, string> = {};
  for (const label of sizesWanted) {
    const s = await ensureSize(label);
    sizeMap[label] = s.id;
  }

  // Produtos
  const productsData = [
    {
      name: "Camiseta Básica Branca",
      description: "Camiseta de algodão 100% confortável e leve.",
      basePrice: new Prisma.Decimal(49.9),
      categoryId: categoryMap["Tops"],
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    },
    {
      name: "Calça Jeans Slim",
      description: "Calça jeans azul escuro, corte slim fit.",
      basePrice: new Prisma.Decimal(149.9),
      categoryId: categoryMap["Bottoms"],
      images: ["https://images.unsplash.com/photo-1514996937319-344454492b37"],
    },
    {
      name: "Vestido Floral Verão",
      description: "Vestido leve com estampa floral, perfeito para dias quentes.",
      basePrice: new Prisma.Decimal(199.9),
      categoryId: categoryMap["Dresses"],
      images: ["https://images.unsplash.com/photo-1520962918287-7448c2878f65"],
    },
    {
      name: "Tênis Casual Branco",
      description: "Tênis confortável e versátil, ideal para o dia a dia.",
      basePrice: new Prisma.Decimal(229.9),
      categoryId: categoryMap["Shoes"],
      images: ["https://images.unsplash.com/photo-1528701800489-20be7c2a02db"],
    },
    {
      name: "Relógio de Pulso Clássico",
      description: "Relógio elegante com pulseira de couro.",
      basePrice: new Prisma.Decimal(349.9),
      categoryId: categoryMap["Accessories"],
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    },
    {
      name: "Jaqueta de Couro Preta",
      description: "Jaqueta estilosa de couro legítimo.",
      basePrice: new Prisma.Decimal(499.9),
      categoryId: categoryMap["Tops"],
      images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
    },
    {
      name: "Saia Midi Plissada",
      description: "Saia moderna e elegante para ocasiões especiais.",
      basePrice: new Prisma.Decimal(179.9),
      categoryId: categoryMap["Bottoms"],
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"],
    },
    {
      name: "Sandália Feminina",
      description: "Sandália aberta com salto médio.",
      basePrice: new Prisma.Decimal(139.9),
      categoryId: categoryMap["Shoes"],
      images: ["https://images.unsplash.com/photo-1600185365483-26d7a5c6e69d"],
    },
    {
      name: "Bolsa de Couro Marrom",
      description: "Bolsa clássica em couro legítimo.",
      basePrice: new Prisma.Decimal(399.9),
      categoryId: categoryMap["Accessories"],
      images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f"],
    },
    {
      name: "Vestido de Festa Longo",
      description: "Vestido sofisticado para eventos noturnos.",
      basePrice: new Prisma.Decimal(599.9),
      categoryId: categoryMap["Dresses"],
      images: ["https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"],
    },
  ];

  // Cria produtos e variantes
  const createdProducts = [];
  for (const p of productsData) {
    const product = await ensureProduct(p);
    createdProducts.push(product);

    // Gera variantes P/M/G nas cores Preto/Branco/Azul
    const colorNames = ["Preto", "Branco", "Azul"];
    const sizeLabels = ["P", "M", "G"];
    for (const cn of colorNames) {
      for (const sl of sizeLabels) {
        const colorId = colorMap[cn];
        const sizeId = sizeMap[sl];
        await ensureVariant(product.id, colorId, sizeId, p.basePrice);
      }
    }
  }

  // Ofertas e associação de produtos 
  const now = new Date();
  const in30d = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const in60d = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

  const offer1 = await ensureOffer({
    name: "Promoção de Verão",
    description: "Descontos especiais para a coleção de verão.",
    discountType: "PERCENTAGE",
    discountValue: new Prisma.Decimal(20), // 20%
    startsAt: now,
    endsAt: in30d,
    isActive: true,
  });

  const offer2 = await ensureOffer({
    name: "Especial Inverno",
    description: "Itens selecionados para o inverno com preço especial.",
    discountType: "PERCENTAGE",
    discountValue: new Prisma.Decimal(15), // 15%
    startsAt: now,
    endsAt: in60d,
    isActive: true,
  });

  // conecta produtos às ofertas por ID 
  const connectByNames = async (offerId: string, productNames: string[]) => {
    const toConnect = [];
    for (const n of productNames) {
      const prod = await prisma.product.findFirst({ where: { name: n } });
      if (prod) toConnect.push({ id: prod.id });
    }
    if (toConnect.length > 0) {
      await prisma.offer.update({
        where: { id: offerId },
        data: { products: { connect: toConnect } },
      });
    }
  };

  await connectByNames(offer1.id, ["Camiseta Básica Branca", "Saia Midi Plissada", "Sandália Feminina"]);
  await connectByNames(offer2.id, ["Jaqueta de Couro Preta", "Calça Jeans Slim"]);

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

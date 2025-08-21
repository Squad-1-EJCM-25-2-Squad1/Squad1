import { Prisma, PrismaClient } from '../../generated/prisma';
import { fakerPT_BR } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

// Cria pedidos para usuários e produtos existentes no banco de dados.
export async function orderSeeder(prisma: PrismaClient, numOrders: number) {
    try {
        console.log(`- Criando ${numOrders} pedidos...`);
        const users = await prisma.user.findMany();
        const products = await prisma.product.findMany();

        if (users.length === 0 || products.length === 0) {
            throw new Error('Usuários ou produtos não encontrados no banco de dados.');
        }

        for (let i = 0; i < numOrders; i++) {
            const randomUser = fakerPT_BR.helpers.arrayElement(users);
            const orderId = uuidv4(); 

            try {
                await prisma.$transaction(async (tx) => {
                    const orderDate = fakerPT_BR.date.past({ years: 1 });
                    const orderAddress = fakerPT_BR.location.streetAddress(true) + ', ' + fakerPT_BR.location.city() + ' - ' + fakerPT_BR.location.state();
                    const orderStatus = fakerPT_BR.helpers.arrayElement(['pending', 'shipped', 'delivered', 'cancelled']);

                    // Garante que o custo total do pedido seja calculado corretamente
                    let currentOrderTotalCost = new Prisma.Decimal(0);
                    const numOrderItems = fakerPT_BR.number.int({ min: 1, max: 3 });
                    const uniqueProductsForOrder = fakerPT_BR.helpers.arrayElements(products, { min: 1, max: numOrderItems });

                    // Calcula o custo total antes de criar o pedido
                    for (const product of uniqueProductsForOrder) {
                        const quantity = fakerPT_BR.number.int({ min: 1, max: 5 });
                        const unitPrice = product.basePrice;
                        currentOrderTotalCost = currentOrderTotalCost.add(unitPrice.mul(quantity));
                    }

                    // Cria o Pedido principal
                    const createdOrder = await tx.order.create({
                        data: {
                            id: orderId,
                            userId: randomUser.id,
                            address: orderAddress,
                            dateOrdered: orderDate,
                            status: orderStatus,
                            totalCost: currentOrderTotalCost,
                        },
                    });

                    // Cria os itens do Pedido e calcula o custo total
                    const orderProductsData: Prisma.OrderProductCreateManyInput[] = [];
                    for (const product of uniqueProductsForOrder) {
                        const orderProductId = uuidv4();
                        const quantity = fakerPT_BR.number.int({ min: 1, max: 5 });
                        const unitPrice = product.basePrice;

                        currentOrderTotalCost = currentOrderTotalCost.add(unitPrice.mul(quantity));

                        orderProductsData.push({
                            id: orderProductId,
                            orderId: createdOrder.id,
                            productId: product.id,
                            quantity: quantity,
                            unitPrice: unitPrice,
                        });
                    }
                    await tx.orderProduct.createMany({ data: orderProductsData });

                    // Atualiza o custo total no Pedido principal
                    await tx.order.update({
                        where: { id: createdOrder.id },
                        data: { totalCost: currentOrderTotalCost }
                    });

                    console.log(`  > Pedido ${createdOrder.id} de ${randomUser.firstName} ${randomUser.lastName} (${numOrderItems} itens) gerado. Total: ${currentOrderTotalCost.toFixed(2)}`);
                });
            } catch (error: any) {
                console.error(`  ERRO ao criar pedido para o usuário ${randomUser.id}:`, error);
            }
        }
        console.log(`- ${numOrders} pedidos concluídos.`);
    } catch (error) {
        console.error('Erro ao criar pedidos:', error);
    }
}
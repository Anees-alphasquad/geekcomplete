import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {

    const user1 = await prisma.users.upsert({
        where: { id: 0 },
        update: {},
        create: {
          email: 'maheen@alphasquad.tech',
          password: 'test123',
          userName: 'maheenmalik',
          displayPicture: 'some_link_here'
        },
      });
    
      const user2 = await prisma.users.upsert({
        where: { id: 0 },
        update: {},
        create: {
          email: 'arslan@alphasquad.tech',
          password: 'test123',
          userName: 'arslan',
          displayPicture: 'some_link_here',
        },
      });
    
      const user3 = await prisma.users.upsert({
        where: { id: 0 },
        update: {},
        create: {
          email: 'haris@alphasquad.tech',
          password: 'test123',
          userName: 'arslan',
          displayPicture: 'some_link_here',
        },
      });

    const interaction1 = await prisma.interactions.upsert({
        where: { id: 0 },
        update: {},
        create: {
          title: 'write an email to HR for leave request',
          type: 'Email',
          userId: 1,
        },
      });
      const interaction2 = await prisma.interactions.upsert({
        where: { id: 0 },
        update: {},
        create: {
          title:
            'write a policy that gives the put, delete, and get object to and of a s3 bucket',
          type: 'chat',
          userId: 2,
        },
      });
    
      const interaction3 = await prisma.interactions.upsert({
        where: { id: 0 },
        update: {},
        create: {
          title: 'write a review for the ecommerce product',
          type: 'review',
          userId: 2,
        },
      });

  const chat1 = await prisma.chats.upsert({
    where: { id: 0 },
    update: {},
    create: {
      message: 'add 10 to the number of casual leaves in above email',
      interactionId: 1,
    },
  });

  const chat2 = await prisma.chats.upsert({
    where: { id: 0 },
    update: {},
    create: {
      message: 'create an IAM user policy that gives access to above s3 bucket',
      interactionId: 2,
    },
  });

  const chat3 = await prisma.chats.upsert({
    where: { id: 0 },
    update: {},
    create: {
      message:
        'the customer support can be improved. Otherwise the quality was pretty good',
      interactionId: 3,
    },
  });


  const product1 = await prisma.products.upsert({
    where: { id: 0 },
    update: {},
    create: {
      title: 'Basic',
      description: 'Basic plan to get you started',
      price: '0',
      numberOfInteractions: 10,
      stripeId: '1278499',
    },
  });

  const product2 = await prisma.products.upsert({
    where: { id: 0 },
    update: {},
    create: {
      title: 'Starter',
      description: 'Basic plan to get you started',
      price: '9',
      numberOfInteractions: 100,
      stripeId: '1278499',
    },
  });

  const product3 = await prisma.products.upsert({
    where: { id: 0 },
    update: {},
    create: {
      title: 'Core',
      description: 'Basic plan to get you started',
      price: '29',
      numberOfInteractions: 500,
      stripeId: '1278499',
    },
  });

  const product4 = await prisma.products.upsert({
    where: { id: 0 },
    update: {},
    create: {
      title: 'Advanced',
      description: 'Basic plan to get you started',
      price: '49',
      numberOfInteractions: 1000,
      stripeId: '1278499',
    },
  });

  const product5 = await prisma.products.upsert({
    where: { id: 0 },
    update: {},
    create: {
      title: 'Pro',
      description: 'Basic plan to get you started',
      price: '249',
      numberOfInteractions: 5000,
      stripeId: '1278499',
    },
  });

  const transaction1 = await prisma.transactions.upsert({
    where: { id: 0 },
    update: {},
    create: {
      productId: 1,
      userId: 1,
    },
  });

  const transaction2 = await prisma.transactions.upsert({
    where: { id: 0 },
    update: {},
    create: {
      productId: 2,
      userId: 2,
    },
  });

  const transaction3 = await prisma.transactions.upsert({
    where: { id: 0 },
    update: {},
    create: {
      productId: 3,
      userId: 3,
    },
  });

  console.log({
    user1,
    user2,
    user3,
    product1,
    product2,
    product3,
    product4,
    product5,
    transaction1,
    transaction2,
    transaction3,
    interaction1,
    interaction2,
    interaction3,
    chat1,
    chat2,
    chat3,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

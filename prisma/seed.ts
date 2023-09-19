// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // model Boards {
  //   boardId          Int      @id @default(autoincrement())
  //   name        String
  //   backgroundColor String
  //   description String?
  //   CreatorId Int

  //   Creator    Users  @relation(fields: [CreatorId], references: [userId])
  //   Columns Columns[]
  //   BoardUsers BoardUsers[]
  //   @@map("Boards")
  // }

  // model Users {
  //   userId       Int      @id @default(autoincrement())
  //   username String
  //   password String
  //   email    String   @unique

  //   Boards   Boards[]
  //   Cards    Cards[]
  //   Comments Comments[]
  //   BoardsUsers BoardUsers[]
  //   CardUsers   CardUsers[]
  //   @@map("Users")
  // }
  // create 1 dummy user
  const user1 = await prisma.users.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      email: 'user1@umail.com',
      password: '1234',
      username: 'user1',
    },
  });

  // create 2 dummy board
  const board1 = await prisma.boards.upsert({
    where: { boardId: 1 },
    update: {},
    create: {
      name: 'board1',
      backgroundColor: 'red',
      description: 'board1',
      CreatorId: 1,
    },
  });

  // create two dummy column
  const column1 = await prisma.columns.upsert({
    where: { columnId: 1 },
    update: {},
    create: {
      name: 'column1',
      order: 1,
      BoardId: 1,
    },
  });

  const column2 = await prisma.columns.upsert({
    where: { columnId: 2 },
    update: {},
    create: {
      name: 'column2',
      order: 2,
      BoardId: 1,
    },
  });

  console.log({ user1, board1, column1, column2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

// // prisma/seed.ts

// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// // initialize Prisma Client
// const prisma = new PrismaClient();

// const roundsOfHashing = 10;

// async function main() {
//   // create 2 dummy users
//   const passwordUser1 = await bcrypt.hash('password-user1', roundsOfHashing);
//   const passwordUser2 = await bcrypt.hash('password-user2', roundsOfHashing);

//   const user1 = await prisma.users.upsert({
//     where: { userId: 1 },
//     update: {
//       password: passwordUser1,
//     },
//     create: {
//       email: 'user1@umail.com',
//       password: passwordUser1,
//       username: 'user1',
//     },
//   });
//   const user2 = await prisma.users.upsert({
//     where: { userId: 2 },
//     update: {
//       password: passwordUser2,
//     },
//     create: {
//       email: 'user2@umail.com',
//       password: passwordUser2,
//       username: 'user2',
//     },
//   });

//   // create 2 dummy boards
//   const board1 = await prisma.boards.upsert({
//     where: { boardId: 1 },
//     update: {
//       CreatorId: user1.userId,
//     },
//     create: {
//       name: 'board1',
//       backgroundColor: 'red',
//       description: 'board1',
//       CreatorId: user1.userId,
//     },
//   });

//   const board2 = await prisma.boards.upsert({
//     where: { boardId: 2 },
//     update: {
//       CreatorId: user2.userId,
//     },
//     create: {
//       name: 'board2',
//       backgroundColor: 'green',
//       description: 'board2',
//       CreatorId: user2.userId,
//     },
//   });

//   // create boarduser relations
//   const boardUser1 = await prisma.boardUsers.upsert({
//     where: {
//       BoardId_UserId: { BoardId: board1.boardId, UserId: user1.userId },
//     },
//     update: {},
//     create: {
//       BoardId: board1.boardId,
//       UserId: user1.userId,
//     },
//   });

//   const boardUser2 = await prisma.boardUsers.upsert({
//     where: {
//       BoardId_UserId: { BoardId: board2.boardId, UserId: user2.userId },
//     },
//     update: {},
//     create: {
//       BoardId: board2.boardId,
//       UserId: user2.userId,
//     },
//   });

//   // create two dummy column
//   const column1 = await prisma.columns.upsert({
//     where: { columnId: 1 },
//     update: {},
//     create: {
//       name: 'column1',
//       order: 1,
//       BoardId: board1.boardId,
//       CreatorId: user1.userId,
//     },
//   });

//   const column2 = await prisma.columns.upsert({
//     where: { columnId: 2 },
//     update: {},
//     create: {
//       name: 'column2',
//       order: 2,
//       BoardId: board1.boardId,
//       CreatorId: user1.userId,
//     },
//   });

//   // create two columnUsers relations
//   const columnUser1 = await prisma.columnUsers.upsert({
//     where: {
//       ColumnId_UserId: { ColumnId: column1.columnId, UserId: user1.userId },
//     },
//     update: {},
//     create: {
//       ColumnId: column1.columnId,
//       UserId: user1.userId,
//     },
//   });

//   const columnUser2 = await prisma.columnUsers.upsert({
//     where: {
//       ColumnId_UserId: { ColumnId: column2.columnId, UserId: user2.userId },
//     },
//     update: {},
//     create: {
//       ColumnId: column2.columnId,
//       UserId: user2.userId,
//     },
//   });

//   // create two cards for column1
//   const card1 = await prisma.cards.upsert({
//     where: { cardId: 1 },
//     update: {},
//     create: {
//       name: 'card1',
//       description: 'card1',
//       order: 1,
//       ColumnId: column1.columnId,
//     },
//   });

//   const card2 = await prisma.cards.upsert({
//     where: { cardId: 2 },
//     update: {},
//     create: {
//       name: 'card2',
//       description: 'card2',
//       order: 2,
//       ColumnId: column1.columnId,
//     },
//   });

//   // create two cards for column2
//   const card3 = await prisma.cards.upsert({
//     where: { cardId: 3 },
//     update: {},
//     create: {
//       name: 'card3',
//       description: 'card3',
//       order: 1,
//       ColumnId: column2.columnId,
//     },
//   });

//   const card4 = await prisma.cards.upsert({
//     where: { cardId: 4 },
//     update: {},
//     create: {
//       name: 'card4',
//       description: 'card4',
//       order: 2,
//       ColumnId: column2.columnId,
//     },
//   });

//   // create two cardUsers relations
//   const cardUser1 = await prisma.cardUsers.upsert({
//     where: {
//       CardId_UserId: { CardId: card1.cardId, UserId: user1.userId },
//     },
//     update: {},
//     create: {
//       CardId: card1.cardId,
//       UserId: user1.userId,
//     },
//   });

//   const cardUser2 = await prisma.cardUsers.upsert({
//     where: {
//       CardId_UserId: { CardId: card2.cardId, UserId: user2.userId },
//     },
//     update: {},
//     create: {
//       CardId: card2.cardId,
//       UserId: user2.userId,
//     },
//   });

//   // create two comments for card1
//   const comment1 = await prisma.comments.upsert({
//     where: { commentId: 1 },
//     update: {},
//     create: {
//       content: 'comment1',
//       CardId: card1.cardId,
//       UserId: user2.userId,
//     },
//   });

//   const comment2 = await prisma.comments.upsert({
//     where: { commentId: 2 },
//     update: {},
//     create: {
//       content: 'comment2',
//       CardId: card1.cardId,
//       UserId: user1.userId,
//     },
//   });

//   console.log({
//     user1,
//     user2,
//     board1,
//     board2,
//     column1,
//     column2,
//     card1,
//     card2,
//     card3,
//     card4,
//     comment1,
//     comment2,
//   });
// }

// // execute the main function
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // close Prisma Client at the end
//     await prisma.$disconnect();
//   });

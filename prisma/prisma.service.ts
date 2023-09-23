<<<<<<<< HEAD:prisma/prisma.service.ts
// /prisma.service.ts
========
>>>>>>>> f436bddd11958f0628610248be1cfd194c29c650:src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$connect();
  }
}

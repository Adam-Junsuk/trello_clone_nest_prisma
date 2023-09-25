// trello_clone_nest_prisma/src/columns/columns.module.ts

import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [PrismaModule],
})
export class ColumnsModule {}

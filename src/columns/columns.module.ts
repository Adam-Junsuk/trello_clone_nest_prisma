import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [PrismaModule],
})
export class ColumnsModule {}

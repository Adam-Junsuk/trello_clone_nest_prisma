import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchModule } from '../search/search.module'; // Import SearchModule

@Module({
  controllers: [CardsController],
  providers: [CardsService, PrismaService],
  imports: [SearchModule], // Add SearchModule
})
export class CardsModule {}

// trello_clone_nest_prisma/src/columns/dto/update-column.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

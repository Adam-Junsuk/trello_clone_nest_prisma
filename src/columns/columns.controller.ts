import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './entities/column.entity';

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiCreatedResponse({ type: ColumnEntity })
  async create(@Body() createColumnDto: CreateColumnDto) {
    const column = await this.columnsService.create(createColumnDto);

    // error handling - body absent or invalid
    if (!column) {
      throw new NotFoundException('Column not created');
    }

    return column;
  }

  @Get()
  @ApiCreatedResponse({ type: ColumnEntity, isArray: true })
  async findAll() {
    const columns = await this.columnsService.findAll();
    return columns;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ColumnEntity })
  async findOne(@Param('id') id: string) {
    const column = await this.columnsService.findOne(+id);
    console.log('column findOne:', column);
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }
    return column;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ColumnEntity })
  async update(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    const column = await this.columnsService.findOne(+id);
    if (!column) {
      throw new NotFoundException(`Target Column with id ${id} not found`);
    }
    return await this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ColumnEntity })
  async remove(@Param('id') id: string) {
    const column = this.columnsService.findOne(+id);
    if (!column) {
      throw new NotFoundException(`Target Column with id ${id} not found`);
    }
    return await this.columnsService.remove(+id);
  }
}

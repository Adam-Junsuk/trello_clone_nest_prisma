import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './entities/column.entity';

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiCreatedResponse({ type: ColumnEntity })
  async create(@Body() createColumnDto: CreateColumnDto) {
    const columnEntity = new ColumnEntity(
      await this.columnsService.create(createColumnDto),
    );
    console.log('columns.controller columnEntity:', columnEntity);
    if (!columnEntity) {
      throw new NotFoundException('Column not created');
    }
    return columnEntity;
  }

  @Get()
  @ApiCreatedResponse({ type: ColumnEntity, isArray: true })
  async findAll() {
    const columns = await this.columnsService.findAll();
    return columns.map((column) => new ColumnEntity(column));
  }

  @Get(':id')
  @ApiOkResponse({ type: ColumnEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const columnEntity = new ColumnEntity(
      await this.columnsService.findOne(id),
    );
    console.log('columns.controller column findOne:', columnEntity);
    if (!columnEntity) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }
    return columnEntity;
  }

  @Put(':id')
  @ApiCreatedResponse({ type: ColumnEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    const columnEntity = new ColumnEntity(
      await this.columnsService.findOne(id),
    );
    if (!columnEntity) {
      throw new NotFoundException(`Target Column with id ${id} not found`);
    }
    return new ColumnEntity(
      await this.columnsService.update(id, updateColumnDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ColumnEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const column = this.columnsService.findOne(id);
    if (!column) {
      throw new NotFoundException(`Target Column with id ${id} not found`);
    }
    return new ColumnEntity(await this.columnsService.remove(id));
  }
}

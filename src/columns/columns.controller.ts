// trello_clone_nest_prisma/src/columns/columns.controller.ts

import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ColumnEntity } from './entities/column.entity';

import { JwtAuthGuard } from '../auth-basic/jwt-auth.guard';

import { Users } from '@prisma/client';

interface RequestWithUser extends Request {
  user: Users;
}

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ColumnEntity })
  @ApiOperation({ summary: '컬럼을 생성' })
  async create(
    @Req() req: RequestWithUser,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    const { userId } = req.user;
    const columnEntity = new ColumnEntity(
      await this.columnsService.create(userId, createColumnDto),
    );
    console.log('columns.controller columnEntity:', columnEntity);
    if (!columnEntity) {
      throw new NotFoundException('Column not created');
    }
    return columnEntity;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ColumnEntity, isArray: true })
  @ApiOperation({ summary: '컬럼 목록을 조회' })
  async findAll() {
    const columns = await this.columnsService.findAll();
    return columns.map((column) => new ColumnEntity(column));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ColumnEntity })
  @ApiOperation({ summary: '컬럼 상세 조회' })
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ColumnEntity })
  @ApiOperation({ summary: '컬럼 내용 수정' })
  @ApiResponse({ status: 404, description: '해당 칼럼을 찾을 수 없음.' })
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ColumnEntity })
  @ApiOperation({ summary: '컬럼 삭제' })
  @ApiResponse({ status: 404, description: '해당 칼럼을 찾을 수 없음.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const column = this.columnsService.findOne(id);
    if (!column) {
      throw new NotFoundException(`Target Column with id ${id} not found`);
    }
    return new ColumnEntity(await this.columnsService.remove(id));
  }
}

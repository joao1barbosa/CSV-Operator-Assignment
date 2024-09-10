import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDto } from '../dto/create-operator.dto';
import { UpdateOperatorDto } from '../dto/update-operator.dto';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  async create(@Body() createOperatorDto: CreateOperatorDto) {
    return await this.operatorsService.create(createOperatorDto);
  }

  @Get()
  async findAll() {
    return await this.operatorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.operatorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return await this.operatorsService.update(+id, updateOperatorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.operatorsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Get('download')
  async downloadFile(@Res() res: Response) {
    return await this.clientsService.export(res);
  }

  @Get('redistribute')
  async redistributeClients() {
    return await this.clientsService.redistribute();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.clientsService.import(file);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clientsService.remove(+id);
  }
}

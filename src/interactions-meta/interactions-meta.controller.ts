import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionsMetaService } from './interactions-meta.service';
import { CreateInteractionsMetaDto } from './dto/create-interactions-meta.dto';
import { UpdateInteractionsMetaDto } from './dto/update-interactions-meta.dto';

@Controller('interactions-meta')
export class InteractionsMetaController {
  constructor(private readonly interactionsMetaService: InteractionsMetaService) {}

  @Post()
  create(@Body() createInteractionsMetaDto: CreateInteractionsMetaDto) {
    return this.interactionsMetaService.create(createInteractionsMetaDto);
  }

  @Get()
  findAll() {
    return this.interactionsMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionsMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteractionsMetaDto: UpdateInteractionsMetaDto) {
    return this.interactionsMetaService.update(+id, updateInteractionsMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionsMetaService.remove(+id);
  }
}

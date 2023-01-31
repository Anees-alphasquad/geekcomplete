import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersMetaService } from './users-meta.service';
import { CreateUsersMetaDto } from './dto/create-users-meta.dto';
import { UpdateUsersMetaDto } from './dto/update-users-meta.dto';

@Controller('users-meta')
export class UsersMetaController {
  constructor(private readonly usersMetaService: UsersMetaService) {}

  @Post()
  create(@Body() createUsersMetaDto: CreateUsersMetaDto) {
    return this.usersMetaService.create(createUsersMetaDto);
  }

  @Get()
  findAll() {
    return this.usersMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersMetaDto: UpdateUsersMetaDto) {
    return this.usersMetaService.update(+id, updateUsersMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersMetaService.remove(+id);
  }
}

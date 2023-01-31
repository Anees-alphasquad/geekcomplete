import { Injectable } from '@nestjs/common';
import { CreateUsersMetaDto } from './dto/create-users-meta.dto';
import { UpdateUsersMetaDto } from './dto/update-users-meta.dto';

@Injectable()
export class UsersMetaService {
  create(createUsersMetaDto: CreateUsersMetaDto) {
    return 'This action adds a new usersMeta';
  }

  findAll() {
    return `This action returns all usersMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersMeta`;
  }

  update(id: number, updateUsersMetaDto: UpdateUsersMetaDto) {
    return `This action updates a #${id} usersMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersMeta`;
  }
}

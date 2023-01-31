import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor (private prisma:PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.prisma.chats.create({
      data: createChatDto
    });
    return chat
  }

  findAll() {
    return this.prisma.chats.findMany();
  }

  findOne(id: number) {
    return this.prisma.chats.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return this.prisma.chats.delete({
      where: {
        id
      }
    });
  }
}

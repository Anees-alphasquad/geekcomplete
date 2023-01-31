import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor (private prisma: PrismaService) {}
  create(createInteractionDto: CreateInteractionDto) {
    return this.prisma.interactions.create({
      data: createInteractionDto
    })
  }

  findAll() {
    return this.prisma.interactions.findMany();
  }

  findOne(id: number) {
    return this.prisma.interactions.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateInteractionDto: UpdateInteractionDto) {
    return this.prisma.interactions.update({
      where: {
        id
      },
      data: updateInteractionDto
    });
  }

  remove(id: number) {
    return this.prisma.interactions.delete({
      where: {
        id
      }
    });
  }
}

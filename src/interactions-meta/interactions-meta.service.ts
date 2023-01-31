import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInteractionsMetaDto } from './dto/create-interactions-meta.dto';
import { UpdateInteractionsMetaDto } from './dto/update-interactions-meta.dto';

@Injectable()
export class InteractionsMetaService {
  constructor (private prisma:PrismaService) {}

  create(createInteractionsMetaDto: CreateInteractionsMetaDto) {
    return this.prisma.interactionMetas.create({
      data: createInteractionsMetaDto
    }) ;
  }

  findAll() {
    return this.prisma.interactionMetas.findMany()
  }

  findOne(id: number) {
    return this.prisma.interactionMetas.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateInteractionsMetaDto: UpdateInteractionsMetaDto) {
    return this.prisma.interactionMetas.update({
      where: {
        id
      }, 
      data: updateInteractionsMetaDto
    })
  }

  remove(id: number) {
    return this.prisma.transactions.delete({
      where: {
        id
      }
    })
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data: createTransactionDto
    })
  }

  findAll() {
    return this.prisma.transactions.findMany();
  }

  findOne(id: number) {
    return this.prisma.transactions.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      where: {
        id
      },
      data: updateTransactionDto
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

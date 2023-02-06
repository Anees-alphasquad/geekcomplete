import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService, private users: UsersService, private products: ProductsService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    
    // Create transaction
    const transaction = await this.prisma.transactions.create({
      data: createTransactionDto
    })

    // Find user in the database and update productId and numberOfInteractions in that product
    // TODO: create user if doesn't exist and update the utilization number as per the product that has been purchased

    const findUser = await this.users.findOne(createTransactionDto.userId)
    const findProductInteractions = await this.products.findOne(createTransactionDto.productId)
  
    const updateUser = await this.prisma.users.update({
      where: {
        id: createTransactionDto.userId
      },
      data: {
        email: findUser.email,
        password: findUser.password,
        userName: findUser.userName,
        displayPicture: findUser.displayPicture,
        productId: createTransactionDto.productId,
        numberOfInteractionsUtilised: findProductInteractions.numberOfInteractions,
        productObject: findProductInteractions.createdAt
      }
    })
    updateUser;
    return transaction
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { isNotEmpty } from 'class-validator';
import { subscribeOn } from 'rxjs';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService, stripe: StripeService) {}

  async create(createUserDto: CreateUserDto) {
    let { email, password, userName, displayPicture, stripeCustomerId } = createUserDto
    const hashPassword = hashSync(password, 8)

    const user = await this.prisma.users.create({
      data: {
        email,
        password: hashPassword,
        userName,
        displayPicture,
        stripeCustomerId
      }
    })
    return user
  }

  findAll() {
      const users = this.prisma.users.findMany({
        include: {
          interaction: true,
          transactions: true,
          products: true
        }
      })
      return users
    }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id
      },
      include: {
        interaction: true,
        transactions: true,
        products: true
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: {
        id
      },
      data: updateUserDto
    })
  }

  // TODO: Add cascade on delete
  remove(id: number) {
    return this.prisma.users.delete({
      where: {
        id
      }
    });
  }

  // Find user by email and password for local signup
  async findUser (email: string, password: string) {
    const findUser = await this.prisma.users.findUnique({
      where: {
        email
      }
    })
    return findUser
  }

  // FInd user by email only
  async findUserByEmail (email: string) {
    return this.prisma.users.findUnique({
      where: {
        email
      }
    })
  }

  async findUserbyStripeId (stripeCustomerId: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        stripeCustomerId
      }
    })
    return user
}
}

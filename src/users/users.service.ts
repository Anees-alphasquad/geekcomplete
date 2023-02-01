import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    let { email, password, userName, displayPicture } = createUserDto
    const hashPassword = hashSync(password, 8)

    const user = await this.prisma.users.create({
      data: {
        email,
        password: hashPassword,
        userName,
        displayPicture
      }
    })
    return user
  }

  findAll() {
    return this.prisma.users.findMany({
      include: {
        interaction: true,
        transactions: true
      }
    })
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id
      },
      include: {
        interaction: true,
        transactions: true
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

  remove(id: number) {
    return this.prisma.users.delete({
      where: {
        id
      }
    });
  }
  async findUser (email: string, password: string) {
    const findUser = await this.prisma.users.findUnique({
      where: {
        email
      }
    })
    return findUser
  }
}

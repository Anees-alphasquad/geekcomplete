import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor (private prisma: PrismaService, private users: UsersService) {}
  
  
  async create(createInteractionDto: CreateInteractionDto) {

    // Find number of interactions utilised by user
    const interactionNumber = await this.users.findOne(createInteractionDto.userId)
    if (interactionNumber.numberOfInteractionsUtilised === 0) {
      
      throw new HttpException('Unauthorized to perform this action', HttpStatus.UNAUTHORIZED);
    }

    // If number of interactions are remaining, allow user create interaction

    const interaction = await this.prisma.interactions.create({
      data: createInteractionDto
    })

    // Once the interaction is made, subtract 1 from the total number of interactions 
    const updateUserInteractions = await this.prisma.users.update({
      where: {
        id: interaction.userId
      },
      data: {
        numberOfInteractionsUtilised: interactionNumber.numberOfInteractionsUtilised - 1
      }
    })
    
    return interaction
  }

  findAll() {
    return this.prisma.interactions.findMany({
      include: {
        chats: true,
        user: true,
      }
    });
  }

  findOne(id: number) {
    return this.prisma.interactions.findUnique({
      where: {
        id
      },
      include: {
        chats: true,
        user: true,
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

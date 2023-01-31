import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionDto } from './create-interaction.dto';
import { IsNumber, IsString } from "class-validator"


export class UpdateInteractionDto extends PartialType(CreateInteractionDto) {
    @IsString()
    title: string

    @IsString()
    type: string
}

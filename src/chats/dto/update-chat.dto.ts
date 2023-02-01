import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class UpdateChatDto extends PartialType(CreateChatDto) {
    @IsNumber()
    @Type(() => Number)
    interactionId: number
}

import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class CreateInteractionDto {
    @IsString()
    title: string

    @IsString()
    type: string
    @Type(()=> Number)
    userId: number
}

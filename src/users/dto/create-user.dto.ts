import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email: string

    @IsEmail()
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    userName: string

    @IsString()
    @IsOptional()
    displayPicture: string

    @IsNumber()
    @Type(()=> Number)
    productId: number

    @IsNumber()
    @Type(()=> Number)
    interactionId: number
}

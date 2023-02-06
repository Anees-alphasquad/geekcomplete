import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsEmail()
    @IsOptional()
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

    @IsOptional()
    @Type(()=> String)
    stripeCustomerId: string

    @IsOptional()
    googleAccessToken: string
}

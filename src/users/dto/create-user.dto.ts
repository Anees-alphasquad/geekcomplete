import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email: string

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
    @IsOptional()
    productId: number

    @IsNumber()
    @Type(()=> Number)
    @IsOptional()
    interactionId: number

    @IsOptional()
    @Type(()=> String)
    stripeCustomerId: string

    @IsOptional()
    socialAccessToken: string

    @IsOptional()
    @Type(()=> Date)
    subscriptionExpiryDate: Date
}

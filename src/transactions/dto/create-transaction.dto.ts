import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class CreateTransactionDto {
    @Type(()=> Number)
    userId: number
    @Type(()=> Number)
    productId: number

    @IsOptional()
    @Type(() => String)
    checkoutSessionId: string
    
    @IsOptional()
    @IsString()
    customerId: string
}

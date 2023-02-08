import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
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

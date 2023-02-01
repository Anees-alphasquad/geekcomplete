import { Type } from "class-transformer"

export class CreateTransactionDto {
    @Type(()=> Number)
    userId: number
    @Type(()=> Number)
    productId: number
}

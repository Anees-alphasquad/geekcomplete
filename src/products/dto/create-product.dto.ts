import { Type } from 'class-transformer';
import { IsNumber, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  stripePriceId: string;

  @IsNumber()
  @Type(() => Number)
  numberOfInteractions: number;

  @IsString()
  StripeSessionId: string;

  @IsNumber()
  @Type(()=> Number)
  @IsOptional()
  userId: number

  @IsOptional()
  productObject: string
}

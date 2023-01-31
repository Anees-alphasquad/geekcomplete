import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsNumber()
  @Type(() => Number)
  numberOfInteractions: number;

  @IsString()
  stripeId: string;
}

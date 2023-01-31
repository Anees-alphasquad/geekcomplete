import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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

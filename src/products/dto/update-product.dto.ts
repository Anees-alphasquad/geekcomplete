import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Type } from 'class-transformer';
import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
    stripeId: string;

    @IsJSON()
    @IsOptional()
    productObject: string
}

// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  ArrayNotEmpty,
  IsMongoId,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @ApiProperty()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categories: string;
}

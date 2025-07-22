import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsMongoId, IsNumber, IsString } from 'class-validator';

export class ListDto {
  @ApiProperty()
  @IsString()
  search?: string;

  @ApiProperty()
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsNumber()
  limit?: number;

  @ApiProperty()
  @IsString()
  sortBy?: string;

  @ApiProperty()
  @IsString()
  sortOrder?: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @ApiProperty()
  @IsMongoId({ each: true })
  categoryIds?: string[];
}

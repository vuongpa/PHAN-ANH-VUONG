import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    required: true,
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: true,
    minimum: 0,
    maximum: Number.MAX_SAFE_INTEGER,
  })
  @IsNumber()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The description of the product',
    required: true,
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  describe?: string;
}

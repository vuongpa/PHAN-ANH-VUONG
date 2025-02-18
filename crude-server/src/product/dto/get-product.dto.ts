import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class GetProductDto {
  @ApiProperty({
    description: 'Search name value',
    required: false,
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Price will be greater than or equal to this value',
    type: Number,
    minimum: 0,
    maximum: Number.MAX_SAFE_INTEGER,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  priceFrom?: number;

  @ApiPropertyOptional({
    description: 'Price will be lesser than or equal to this value',
    type: Number,
    minimum: 0,
    maximum: Number.MAX_SAFE_INTEGER,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  priceTo?: number;

  @ApiPropertyOptional({
    description: 'Skip this number of products',
    type: Number,
    minimum: 0,
    maximum: Number.MAX_SAFE_INTEGER,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  skip?: number;

  @ApiPropertyOptional({
    description: 'Take this number of products',
    type: Number,
    minimum: 0,
    maximum: Number.MAX_SAFE_INTEGER,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  take?: number;
}

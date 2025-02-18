import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String, required: false, nullable: true })
  describe: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Boolean, default: false })
  isDeleted: boolean;
}

export class ProductPaginate {
  @ApiProperty({ type: Product, isArray: true })
  data: [Product];

  @ApiProperty({ type: Number })
  totalDocuments: number;
}

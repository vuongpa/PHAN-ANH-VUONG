import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { ProductWhereInput } from 'prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll({
    name,
    priceFrom,
    priceTo,
    skip = 0,
    take = 10,
  }: GetProductDto) {
    const where: ProductWhereInput = { isDeleted: false };
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (priceFrom) {
      where.price = {
        ...(where.price || {}),
        gte: priceFrom,
      };
    }
    if (priceTo) {
      where.price = {
        ...(where.price || {}),
        lte: priceTo,
      };
    }

    const [data, totalDocuments] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      this.prisma.product.count({
        where,
      }),
    ]);

    return {
      data,
      totalDocuments,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Could not found product by id: ${id}`);
    }
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Could not found product by id: ${id}`);
    }
    if (product.isDeleted) {
      throw new BadRequestException(
        `Product with ID ${id} has already been deleted`,
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}

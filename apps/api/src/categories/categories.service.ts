import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Prisma } from '@prisma/client';
import { Category } from './models/category.model';

const categoryInclude = {
  products: true,
  parent: true,
  subcategories: true,
};

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    try {
      const categories = await this.prisma.category.findMany({
        skip,
        take,
        where,
        orderBy,
        include: categoryInclude,
      });
      return categories;
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true, parent: true, subcategories: true },
    });
  }

  async count(where?: Prisma.CategoryWhereInput): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async create(data: CreateCategoryInput) {
    const category = await this.prisma.category.findUnique({
      where: { name: data.name },
    });
    if (category) {
      throw new Error('Category already exists');
    }
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: UpdateCategoryInput) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category not found');
    }
    return this.prisma.category.delete({ where: { id } });
  }
}

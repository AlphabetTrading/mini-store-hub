import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true, parent: true, subcategories: true },
    });
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
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}

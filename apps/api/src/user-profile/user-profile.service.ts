import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage1/storage.service';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateUserProfileInput) {
    return this.prisma.userProfile.create({ data });
  }

  async update(userId: string, data: UpdateUserProfileInput) {
    return this.prisma.userProfile.update({
      where: { userId },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.userProfile.delete({ where: { id } });
  }

  // async addPhoto(
  //   userId: string,
  //   imageBuffer: Express.Multer.File,
  //   filename: string,
  // ) {
  //   const photo = await this.storageService.uploadFile(imageBuffer, filename);
  //   await this.prisma.userProfile.update({
  //     where: {
  //       userId,
  //     },
  //     data: {},
  //   });
  //   return photo;
  // }
}

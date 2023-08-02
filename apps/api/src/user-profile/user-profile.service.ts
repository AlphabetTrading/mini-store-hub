import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { Prisma } from '@prisma/client';

const userProfileIncludeObject: Prisma.UserProfileInclude = {
  address: true,
  user: true,
};

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserProfileInput) {
    return this.prisma.userProfile.create({
      data: {
        address: {
          create: {
            ...data.address,
          },
        },
        photoUrl: data.photoUrl,
        idUrl: data.idUrl,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
      include: userProfileIncludeObject,
    });
  }

  async update(userId: string, data: UpdateUserProfileInput) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: {
        idUrl: data.idUrl,
        photoUrl: data.photoUrl,
        user: {
          connect: {
            id: userId,
          },
        },
        address: {
          upsert: {
            create: {
              ...data.address,
            },
            update: {
              ...data.address,
            },
          },
        },
      },
      include: userProfileIncludeObject,
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

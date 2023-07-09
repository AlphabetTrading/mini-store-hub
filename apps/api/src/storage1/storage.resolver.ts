import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import {} from 'graphql-upload';
import { createWriteStream } from 'fs';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as FileUpload from 'graphql-upload/Upload.js';

@Resolver()
@UseGuards(GqlAuthGuard)
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  // @Mutation(() => String, { name: 'uploadFile' })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1000 }),
  //         new FileTypeValidator({ fileType: 'image' }),
  //       ],
  //     }),
  //   )
  //   @Args('file')
  //   file: Express.Multer.File,
  // ) {
  //   const folder = 'uploads';
  //   const res = await this.storageService.uploadFile(file, folder);
  //   console.log(res);
  //   return res;
  // }

  @Mutation(() => Boolean)
  async singleUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ) {
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false));
    });
  }

  @Mutation(() => String, { name: 'deleteFile' })
  async deleteFile(@Args('filename') filename: string): Promise<any> {
    return await this.storageService.deleteFile(filename);
  }

  @Mutation(() => String, { name: 'uploadFile' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const folder = 'uploads';
    const res = await this.storageService.uploadFile(file, folder);
    console.log(res);
    return res;
  }
}

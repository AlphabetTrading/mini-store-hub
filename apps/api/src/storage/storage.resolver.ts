import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StorageService } from './storage.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as FileUpload from 'graphql-upload/Upload.js';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver()
export class StorageResolver {
  constructor(private readonly storStorageService: StorageService) {}

  @Mutation(() => String)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    try {
      console.log(file);
      if (
        ['JPG', 'JPEG', 'PNG', 'WEBP'].indexOf(
          file.filename.split('.').pop().toUpperCase(),
        ) == -1
      )
        throw new BadRequestException('File type must an image');

      if (file.size > 1000000)
        throw new BadRequestException('File size must be less than 1MB');

      const { createReadStream } = file;

      const stream = createReadStream();
      const chunks = [];

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });
      const fileData = await this.storStorageService.uploadPublicFile(
        buffer,
        file.filename,
      );
      return fileData.url;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

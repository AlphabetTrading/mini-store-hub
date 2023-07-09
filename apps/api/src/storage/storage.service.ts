import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3;
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(
    body: Buffer | ArrayBuffer,
    key: string,
  ): Promise<{ key: string; url: string }> {
    const awsConfig = {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.getOrThrow('AWS_REGION'),
    };

    this.s3 = new S3Client(awsConfig);

    try {
      const params = {
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: body,
        Key: key,
      };

      console.log(params);
      const response = await this.s3.send(
        new PutObjectCommand({
          Bucket: params.Bucket,
          Key: params.Key,
          Body: params.Body as any,
        }),
      );
      return { key: key, url: this.getObjectUrl(key) };
    } catch (e) {
      this.logger.error({ error: e }, 'S3ObjectUploadFailed');
      throw new Error('S3UploadFailed');
    }
  }

  //   async deleteS3Object(url: string) {
  //     const urlObj = new URL(url);
  //     const key = urlObj.pathname.startsWith('/')
  //       ? urlObj.pathname.slice(1)
  //       : urlObj.pathname;
  //     const s3 = new S3();
  //     try {
  //       await s3
  //         .deleteObject({
  //           Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
  //           Key: key,
  //         })
  //         .promise();
  //     } catch (e) {
  //       this.logger.error({ error: e }, 'S3ObjectDeleteFailed');
  //       throw new Error('S3DeleteFailed');
  //     }
  //   }

  private getObjectUrl(key: string) {
    const bucket = this.configService.get('AWS_S3_BUCKET_NAME');
    const region = this.configService.get('AWS_REGION');
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}

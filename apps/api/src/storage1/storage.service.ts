import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

// import * as FileUpload from 'graphql-upload/Upload';

@Injectable()
export class StorageService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    const awsConfig = {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.getOrThrow('AWS_REGION'),
    };

    this.s3 = new S3Client(awsConfig);
  }
  async uploadFile(file: Express.Multer.File, folder: string) {
    // const { filename, mimetype, encoding, createReadStream } = await file;
    // console.log('file:', filename, mimetype, encoding);

    // const stream = createReadStream();

    // let bufferData: Buffer = Buffer.from([]);

    // stream.on('data', async (chunk: Buffer) => {
    //   bufferData = Buffer.concat([bufferData, chunk]);
    // });
    // const params = {
    //   Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
    //   Key: `${folder}/${filename}`,
    //   Body: bufferData,
    // };

    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `${folder}/${file.originalname}`,
      Body: file.stream,
    };
    const response = await this.s3.send(
      new PutObjectCommand({
        ...params,
      }),
    );

    return response;
  }

  async deleteFile(key: string) {
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: key,
    };

    return this.s3.send(new DeleteObjectCommand(params));
  }
}

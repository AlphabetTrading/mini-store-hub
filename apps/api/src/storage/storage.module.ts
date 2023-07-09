import { Module } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { StorageResolver } from './storage.resolver';

@Module({
  providers: [StorageResolver, StorageService],
})
export class StorageModule {}

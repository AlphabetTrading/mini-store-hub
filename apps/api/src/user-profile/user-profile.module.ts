import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [],
  providers: [UserProfileResolver, UserProfileService, StorageService],
})
export class UserProfileModule {}

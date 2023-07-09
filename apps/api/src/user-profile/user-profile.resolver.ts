import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UserProfile } from './models/userProfile.model';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile)
  createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.userProfileService.create(createUserProfileInput);
  }

  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('id') id: string,
    @Args('updateProfileInput')
    updateProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.update(id, updateProfileInput);
  }

  @Mutation(() => UserProfile)
  deleteUserProfile(@Args('id') id: string) {
    return this.userProfileService.remove(id);
  }
}

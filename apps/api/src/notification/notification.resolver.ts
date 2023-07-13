import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { sendPushNotificationInput } from './dto/sendPushNotification.dto';
import { UpdateNotificationTokenInput } from './dto/updateNotificationToken.dto';
import { Notification } from './models/notification.model';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [Notification])
  async notifications() {
    return this.notificationService.getNotifications();
  }

  @Query(() => [Notification])
  async allUsersNotifications(@Args('userId') userId: string) {
    return this.notificationService.getNotificationsByUserId(userId);
  }

  @Query(() => [Notification])
  async readNotifications(@Args('userId') userId: string) {
    return this.notificationService.getNotificationsByUserIdAndStatus(
      userId,
      false,
    );
  }

  @Query(() => [Notification])
  async unreadNotifications(@Args('userId') userId: string) {
    return this.notificationService.getNotificationsByUserIdAndStatus(
      userId,
      true,
    );
  }

  // @Mutation(() => Notification)
  // async createNotification(
  //   @Args() createNoficationInput: sendPushNotificationInput,
  // ) {
  //   return this.notificationService.sendPush(createNoficationInput);
  // }

  @Mutation(() => Notification)
  async disablePushNotification(
    @Args('userId') id: string,
    @Args('data') data: UpdateNotificationTokenInput,
  ) {
    return this.notificationService.disablePushNotification(id, data);
  }
}

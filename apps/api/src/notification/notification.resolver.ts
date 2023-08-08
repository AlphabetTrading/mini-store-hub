import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { sendPushNotificationInput } from './dto/sendPushNotification.dto';
import { UpdateNotificationTokenInput } from './dto/updateNotificationToken.dto';
import { Notification } from './models/notification.model';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationEvent } from './events/notification.event';
import { sendBulkPushNotificationInput } from './dto/sendBulkPushNotification.dto';
import { PaginationNotifications } from 'src/common/pagination/pagination-info';
import { FilterNotificationInput } from './dto/filter-notifications.input';
import { NotificationOrder } from './dto/notifications-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { Prisma } from '@prisma/client';
import { CreateNotificationTokenInput } from './dto/createNotificationToken.dto';
import { NotificationToken } from './models/notification_token.model';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // @Query(() => [Notification])
  // async notifications() {
  //   return this.notificationService.getNotifications();
  // }

  // @Query(() => PaginationNotifications)
  // async allUsersNotifications(
  //   @Args('filterNotificationInput', {
  //     type: () => FilterNotificationInput,
  //     nullable: true,
  //   })
  //   filterNotificationInput?: FilterNotificationInput,
  //   @Args('orderBy', {
  //     type: () => NotificationOrder,
  //     nullable: true,
  //   })
  //   orderBy?: NotificationOrder,
  //   @Args('paginationInput', { type: () => PaginationInput, nullable: true })
  //   paginationInput?: PaginationInput,
  // ): Promise<PaginationNotifications> {
  //   const where: Prisma.NotificationWhereInput = {
  //     AND: [
  //       {
  //         id: filterNotificationInput?.id,
  //       },
  //       {
  //         OR: [
  //           {
  //             title: filterNotificationInput?.title,
  //           },
  //           {
  //             amharicTitle: filterNotificationInput?.title,
  //           },
  //         ],
  //       },
  //       {
  //         OR: [
  //           {
  //             body: filterNotificationInput?.body,
  //           },
  //           {
  //             amharicBody: filterNotificationInput?.body,
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   const count = await this.notificationService.count(where);
  //   const notifications =
  //     await this.notificationService.getNotificationsByUserId({
  //       where,
  //       orderBy: {
  //         [orderBy?.field]: orderBy?.direction,
  //       },
  //       skip: paginationInput?.skip,
  //       take: paginationInput?.take,
  //     });

  //   return {
  //     items: notifications,
  //     meta: {
  //       count,
  //       limit: paginationInput.take,
  //       page: paginationInput.skip,
  //     },
  //   };
  // }

  // get a single notification
  @Query(() => Notification, { name: 'notificationById' })
  async notificationById(@Args('id') notificationId: string) {
    return this.notificationService.findOne(notificationId);
  }

  // @Query(() => [Notification])
  // async readNotifications(@Args('userId') userId: string) {
  //   return this.notificationService.getNotificationsByUserIdAndStatus(
  //     userId,
  //     false,
  //   );
  // }

  // @Query(() => [Notification])
  // async unreadNotifications(@Args('userId') userId: string) {
  //   return this.notificationService.getNotificationsByUserIdAndStatus(
  //     userId,
  //     true,
  //   );
  // }

  @Query(() => [Notification])
  async allNotificationsByUserId(@Args('userId') userId: string) {
    return this.notificationService.getAllNotificationsByUserId(userId);
  }

  @Query(() => [Notification])
  async unreadNotificationsByUserId(@Args('userId') userId: string) {
    return this.notificationService.getAllUnreadNotifications(userId);
  }

  @Query(() => [Notification])
  async readNotificationsByUserId(@Args('userId') userId: string) {
    return this.notificationService.getAllReadNotifications(userId);
  }

  @Query(() => [Notification])
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Mutation(() => Notification, { name: 'sendPushNotification' })
  async sendPushNotification(
    @Args('data') createNoficationInput: sendPushNotificationInput,
  ) {
    if (createNoficationInput.recipientId) {
      // get notification token using the recipient type
      const notificationTokens =
        await this.notificationService.getNotificationTokensByUserId(
          createNoficationInput.recipientId,
        );
      // call event emitter to send broadcast notification
      this.eventEmitter.emitAsync(
        'notification.created',
        new NotificationEvent({
          notification_body: createNoficationInput.body,
          notification_title: createNoficationInput.title,
          tokens: notificationTokens,
        }),
      );

      return this.notificationService.sendIndividualNotification(
        createNoficationInput,
      );
    } else {
      // get notification token using the recipient type
      const notificationTokens =
        await this.notificationService.getNotificationTokens(
          createNoficationInput.recipientType,
        );

      // call event emitter to send broadcast notification
      this.eventEmitter.emitAsync(
        'notification.created',
        new NotificationEvent({
          notification_body: createNoficationInput.body,
          notification_title: createNoficationInput.title,
          tokens: notificationTokens,
        }),
      );
      return this.notificationService.sendBroadcastNotification(
        createNoficationInput,
      );
    }
  }

  @Mutation(() => NotificationToken, { name: 'acceptNotification' })
  async acceptNotification(
    @Args('notificationInput') notificationInput: CreateNotificationTokenInput,
  ) {
    return this.notificationService.acceptPushNotification(notificationInput);
  }

  @Mutation(() => NotificationToken, { name: 'removeNotificationToken' })
  async removeNotificationToken(@Args('data') notificationToken: string) {
    return this.notificationService.removeNotificationToken(notificationToken);
  }

  @Mutation(() => NotificationToken, { name: 'updateNotificationToken' })
  async updateNotificationToken(
    @Args('userId') id: string,
    @Args('data') data: UpdateNotificationTokenInput,
  ) {
    return this.notificationService.updateNotificationToken(id, data);
  }

  @Mutation(() => NotificationToken, { name: 'disablePushNotification' })
  async disablePushNotification(
    @Args('userId') id: string,
    @Args('data') data: UpdateNotificationTokenInput,
  ) {
    return this.notificationService.disablePushNotification(id, data);
  }

  // @Mutation(() => Notification, { name: 'sendBulkNotification' })
  // async sendBulkNotification(
  //   @Args('data') data: sendBulkPushNotificationInput,
  // ) {
  //   // call event emitter to send bulk notification
  //   this.eventEmitter.emitAsync(
  //     'bulkNotification.created',
  //     new NotificationEvent({
  //       notification_body: data.body,
  //       notification_title: data.title,
  //       tokens: data.tokens,
  //     }),
  //   );

  //   return {
  //     message: 'Bulk Notification Sent',
  //     status: 'success',
  //     statusCode: 200,
  //   };
  // }

  @Mutation(() => Notification, { name: 'markNotificationAsRead' })
  async markNotificationAsRead(
    @Args('notificationId') notificationId: string,
    @Args('userId') userId: string,
  ) {
    return this.notificationService.markNotificationAsRead(
      notificationId,
      userId,
    );
  }

  @OnEvent('bulkNotification.created', { async: true })
  handleBulkNotificationEvent(payload: NotificationEvent) {
    this.notificationService.sendBulkPush(payload);
  }

  @OnEvent('notification.created', { async: true })
  handleBroadcastNotificationEvent(payload: NotificationEvent) {
    this.notificationService.sendBulkPush(payload);
  }
}

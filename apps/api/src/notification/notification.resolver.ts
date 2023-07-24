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

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Query(() => [Notification])
  async notifications() {
    return this.notificationService.getNotifications();
  }

  @Query(() => PaginationNotifications)
  async allUsersNotifications(
    @Args('filterNotificationInput', {
      type: () => FilterNotificationInput,
      nullable: true,
    })
    filterNotificationInput?: FilterNotificationInput,
    @Args('orderBy', {
      type: () => NotificationOrder,
      nullable: true,
    })
    orderBy?: NotificationOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationNotifications> {
    const where: Prisma.NotificationWhereInput = {
      AND: [
        {
          id: filterNotificationInput?.id,
        },
        {
          OR: [
            {
              title: filterNotificationInput?.title,
            },
            {
              amharicTitle: filterNotificationInput?.title,
            },
          ],
        },
        {
          OR: [
            {
              body: filterNotificationInput?.body,
            },
            {
              amharicBody: filterNotificationInput?.body,
            },
          ],
        },
      ],
    };

    const count = await this.notificationService.count();
    const notifications =
      await this.notificationService.getNotificationsByUserId({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

    return {
      items: notifications,
      meta: {
        count,
        limit: paginationInput.take,
        page: paginationInput.skip,
      },
    };
  }

  // get a single notification
  @Query(() => Notification)
  async notificationById(@Args('id') notificationId: string) {
    return this.notificationService.findOne(notificationId);
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

  @Mutation(() => Notification, { name: 'sendPushNotification' })
  async sendPushNotification(
    @Args('data') createNoficationInput: sendPushNotificationInput,
  ) {
    return this.notificationService.sendPush(createNoficationInput);
  }

  @Mutation(() => Notification)
  async disablePushNotification(
    @Args('userId') id: string,
    @Args('data') data: UpdateNotificationTokenInput,
  ) {
    return this.notificationService.disablePushNotification(id, data);
  }

  @Mutation(() => Notification, { name: 'sendBulkNotification' })
  async sendBulkNotification(
    @Args('data') data: sendBulkPushNotificationInput,
  ) {
    // call event emitter to send bulk notification
    this.eventEmitter.emitAsync(
      'bulkNotification.created',
      new NotificationEvent({
        notification_body: data.body,
        notification_title: data.title,
        userIds: data.userIds,
      }),
    );

    return {
      message: 'Bulk Notification Sent',
      status: 'success',
      statusCode: 200,
    };
  }

  @OnEvent('bulkNotification.created', { async: true })
  handleBulkNotificationEvent(payload: NotificationEvent) {
    this.notificationService.sendBulkPush(payload);
  }
}

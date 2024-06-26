import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationTokenInput } from './dto/createNotificationToken.dto';
import { sendPushNotificationInput } from './dto/sendPushNotification.dto';
import { UpdateNotificationTokenInput } from './dto/updateNotificationToken.dto';
import { NotificationEvent } from './events/notification.event';
import { Expo } from 'expo-server-sdk';

import {
  NotificationToken,
  Prisma,
  RecipientType,
  UserRole,
} from '@prisma/client';
import { Notification } from './models/notification.model';
import { RecordsEvent } from '@aws-sdk/client-s3';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNotifications(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      include: {
        notificationReads: true,
        user: true,
      },
    });
    return notifications;
  }

  async getAllNotificationsByUserId(userId: string): Promise<Notification[]> {
    // identify recipient type from the user
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    let recipientType: RecipientType[] = ['USER'];
    switch (user.role) {
      case UserRole.ADMIN:
        recipientType = [RecipientType.ALL, RecipientType.USER];
        break;
      case UserRole.RETAIL_SHOP_MANAGER:
        recipientType = [
          RecipientType.RETAIL_SHOP,
          RecipientType.USER,
          RecipientType.ALL,
        ];
        break;
      case UserRole.WAREHOUSE_MANAGER:
        recipientType = [
          RecipientType.WAREHOUSE,
          RecipientType.USER,
          RecipientType.ALL,
        ];
        break;
      default:
        break;
    }

    const readNotificationIds = await this.prisma.notificationRead.findMany({
      where: {
        userId,
      },
      select: {
        notificationId: true,
      },
    });

    const notificationIds = readNotificationIds.map(
      (readNotification) => readNotification.notificationId,
    );

    const readNotifications = await this.prisma.notification.findMany({
      where: {
        OR: [
          {
            recipientId: userId,
          },
          {
            id: {
              in: notificationIds,
            },
          },
          {
            recipientType: {
              in: recipientType,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });

    return readNotifications.map((notification) => {
      if (
        notification.notificationReads.filter(
          (notfi: any) => notfi.userId === userId,
        ).length > 0
      ) {
        const notificationData = {
          ...notification,
          isRead: true,
        };

        delete notificationData.notificationReads;

        return notificationData;
      }
      return notification;
    });
  }

  async getAllUnreadNotificationsCount(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    let notificationTypes: RecipientType[] = [RecipientType.USER];

    if (user.role === UserRole.ADMIN) {
      notificationTypes = [RecipientType.ALL, RecipientType.USER];
    } else if (user.role === UserRole.RETAIL_SHOP_MANAGER) {
      notificationTypes = [
        RecipientType.RETAIL_SHOP,
        RecipientType.ALL,
        RecipientType.USER,
      ];
    } else if (user.role === UserRole.WAREHOUSE_MANAGER) {
      notificationTypes = [
        RecipientType.WAREHOUSE,
        RecipientType.ALL,
        RecipientType.USER,
      ];
    }

    const readNotificationIds = await this.prisma.notificationRead.findMany({
      where: {
        userId,
      },
      select: {
        notificationId: true,
      },
    });

    const notificationIds = readNotificationIds.map(
      (readNotification) => readNotification.notificationId,
    );

    const unreadNotifications = await this.prisma.notification.count({
      where: {
        isRead: false,
        id: {
          notIn: notificationIds,
        },
        recipientType: {
          in: notificationTypes,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return unreadNotifications;
  }

  async getAllReadNotifications(userId: string): Promise<Notification[]> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    let recipientType: RecipientType[] = ['USER'];
    switch (user.role) {
      case UserRole.ADMIN:
        recipientType = ['ALL', 'USER'];
        break;
      case UserRole.RETAIL_SHOP_MANAGER:
        recipientType = ['RETAIL_SHOP', 'ALL', 'USER'];
        break;
      case UserRole.WAREHOUSE_MANAGER:
        recipientType = ['WAREHOUSE', 'ALL', 'USER'];
        break;
      default:
        break;
    }

    const readNotificationIds = await this.prisma.notificationRead.findMany({
      where: {
        userId,
      },
      select: {
        notificationId: true,
      },
    });

    const notificationIds = readNotificationIds.map(
      (readNotification) => readNotification.notificationId,
    );

    const readNotifications = await this.prisma.notification.findMany({
      where: {
        OR: [
          {
            id: {
              in: notificationIds,
            },
          },
          {
            recipientType: {
              in: recipientType,
            },
          },
        ],
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });

    return readNotifications;
  }

  async getAllUnreadNotifications(userId: string): Promise<Notification[]> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    let notificationTypes: RecipientType[] = [RecipientType.USER];

    if (user.role === UserRole.ADMIN) {
      notificationTypes = [RecipientType.ALL, RecipientType.USER];
    } else if (user.role === UserRole.RETAIL_SHOP_MANAGER) {
      notificationTypes = [
        RecipientType.RETAIL_SHOP,
        RecipientType.ALL,
        RecipientType.USER,
      ];
    } else if (user.role === UserRole.WAREHOUSE_MANAGER) {
      notificationTypes = [
        RecipientType.WAREHOUSE,
        RecipientType.ALL,
        RecipientType.USER,
      ];
    }

    const readNotificationIds = await this.prisma.notificationRead.findMany({
      where: {
        userId,
      },
      select: {
        notificationId: true,
      },
    });

    const notificationIds = readNotificationIds.map(
      (readNotification) => readNotification.notificationId,
    );

    const unreadNotifications = await this.prisma.notification.findMany({
      where: {
        isRead: false,
        id: {
          notIn: notificationIds,
        },
        recipientType: {
          in: notificationTypes,
        },
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });

    return unreadNotifications;
  }

  async sendBulkPush(payload: NotificationEvent) {
    try {
      const notification_title = payload.notification_title;
      const notification_body = payload.notification_body;
      const notification_tokens = payload.tokens;
      const notification_id = payload.notification_id;

      // send notification to expo
      await this.sendExpoNotification(
        notification_tokens,
        notification_title,
        notification_body,
        notification_id,
      );

      // save notification on each users
      const users = await this.prisma.user.findMany({
        where: {
          id: {
            in: payload.tokens,
          },
        },
        include: {
          notificationTokens: true,
        },
      });
      users.forEach(async (user) => {
        await this.prisma.notification.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            body: notification_body,
            title: notification_title,
            status: true,
            isRead: false,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUnreadNotifications() {
    const notifications = await this.prisma.notification.findMany({
      where: { status: true },
      include: {
        notificationReads: true,
        user: true,
      },
    });
    return notifications;
  }

  async getNotificationsByUserId({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput;
  }): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        notificationReads: true,
        user: true,
      },
    });
  }

  async count(where?: Prisma.NotificationWhereInput): Promise<number> {
    return this.prisma.notification.count({ where });
  }

  async findOne(notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification is not found');
    }

    return await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });
  }

  async getUsersNotificationDetailByUserIdAndNotificationId(
    userId: string,
    notificationId: string,
  ) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
      include: {
        user: true,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification is not found');
    }

    // check if it is read
    const hasRead = this.prisma.notificationRead.findFirst({
      where: {
        notificationId,
        userId,
      },
    });

    return {
      ...notification,
      isRead: hasRead ? notification.isRead : false,
    };
  }

  async getNotificationsByUserIdAndStatus(user_id: string, status: boolean) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user: {
          id: user_id,
        },
        isRead: status,
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });
    return notifications;
  }

  async acceptPushNotification(
    notification_token_dto: CreateNotificationTokenInput,
  ) {
    const { userId, token, device_type } = notification_token_dto;
    const notification_token = this.prisma.notificationToken.upsert({
      where: {
        token: token,
      },
      create: {
        device_type: device_type,
        token,
        status: true,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        user: {
          connect: {
            id: userId,
          },
        },
        device_type: device_type,
        token: token,
        status: true,
      },
    });

    return notification_token;
  }

  async updateNotificationToken(
    id: string,
    data: UpdateNotificationTokenInput,
  ) {
    const notification_token = this.prisma.notificationToken.upsert({
      where: {
        token: data.notification_token,
      },
      create: {
        token: data.notification_token,
        status: true,
        device_type: data.device_type,
        user: {
          connect: {
            id: id,
          },
        },
      },
      update: {
        ...data,
      },
      include: {
        user: true,
      },
    });

    return notification_token;
  }

  async disablePushNotification(
    userId: string,
    update_dto: UpdateNotificationTokenInput,
  ) {
    try {
      await this.prisma.notificationToken.update({
        where: {
          userId: userId,
          token: update_dto.notification_token,
        },
        data: {
          ...update_dto,
          status: false,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async removeNotificationToken(
    notification_token: string,
  ): Promise<NotificationToken> {
    const notification = await this.prisma.notificationToken.findUnique({
      where: {
        token: notification_token,
      },
    });

    if (!notification) {
      return;
    }

    await this.prisma.notificationToken.delete({
      where: {
        token: notification_token,
      },
    });

    return notification;
  }

  async getNotifications() {
    const notifications = await this.prisma.notification.findMany({
      include: {
        notificationReads: true,
        user: true,
      },
    });
    return notifications;
  }

  async sendPush(createNoficationInput: sendPushNotificationInput) {
    const { title, body, recipientType, recipientId } = createNoficationInput;
    try {
      const notificationToken = await this.prisma.notificationToken.findFirst({
        where: { user: { id: recipientId }, status: true },
      });
      if (notificationToken) {
        const notification = await this.prisma.notification.create({
          data: {
            title,
            body,
            recipientType,
            isRead: false,
            user: {
              connect: {
                id: recipientId,
              },
            },
          },
          include: {
            notificationReads: true,
            user: true,
          },
        });

        await this.sendExpoNotification(
          [notificationToken.token],
          title,
          body,
          notification.id,
        );

        return notification;
      }
    } catch (error) {
      return error;
    }
  }

  async markNotificationAsRead(
    notificationId: string,
    userId: string,
  ): Promise<Notification> {
    // get the notification and if the notification is group notification, then mark the notification as read
    // for all users

    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    // check if the notification is group notification
    if (notification.recipientType !== UserRole.USER) {
      const notificationRead = await this.prisma.notificationRead.upsert({
        where: {
          notificationId_userId: {
            notificationId,
            userId,
          },
        },
        create: {
          notificationId,
          userId,
        },
        update: {
          notificationId,
          userId,
        },
        include: {
          notification: {
            include: {
              notificationReads: true,
              user: true,
            },
          },
        },
      });
      return notificationRead.notification;
    }

    return await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
      include: {
        notificationReads: true,
        user: true,
      },
    });
  }

  async sendBroadcastNotification({
    notificationId,
    title,
    body,
    recipientType,
  }: any): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        id: notificationId,
        title,
        body,
        recipientType,
        isRead: false,
      },
    });

    return notification;
  }

  async sendIndividualNotification({
    notificationId,
    title,
    body,
    recipientType,
    recipientId,
  }: any): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        id: notificationId,
        title,
        body,
        recipientType,
        recipientId,
        isRead: false,
      },
    });

    return notification;
  }

  async getNotificationTokensByUserId(userId: string) {
    const notificationTokens = await this.prisma.notificationToken.findMany({
      where: { user: { id: userId }, status: true },
      select: {
        token: true,
      },
    });

    return notificationTokens.map(
      (notificationToken) => notificationToken.token,
    );
  }

  async getNotificationTokens(recipientType: RecipientType) {
    let where: Prisma.NotificationTokenWhereInput = {};
    if (recipientType === 'ALL') {
      where = {
        user: {
          role: {
            not: UserRole.ADMIN,
          },
        },
      };
    } else if (recipientType === 'RETAIL_SHOP') {
      where = {
        user: {
          role: UserRole.RETAIL_SHOP_MANAGER,
        },
      };
    } else if (recipientType === 'WAREHOUSE') {
      where = {
        user: {
          role: UserRole.WAREHOUSE_MANAGER,
        },
      };
    } else {
      where = {
        user: {
          role: UserRole.USER,
        },
      };
    }

    const notificationTokens = await this.prisma.notificationToken.findMany({
      where: {
        ...where,
        status: true,
      },
      select: {
        token: true,
      },
    });

    return notificationTokens.map(
      (notificationToken) => notificationToken.token,
    );
  }

  async sendExpoNotification(
    notificationTokens: string[],
    title: string,
    body: string,
    notificationId: string,
  ) {
    const expo = new Expo();
    // Create the messages that you want to send to clients
    let messages = [];
    for (let pushToken of notificationTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      console.log(pushToken);

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body,
        data: { notificationId },
      });
    }
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    (async () => {
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return tickets;
  }
}

import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { User } from 'src/users/models/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationTokenInput } from './dto/createNotificationToken.dto';
import { sendPushNotificationInput } from './dto/sendPushNotification.dto';
import { UpdateNotificationTokenInput } from './dto/updateNotificationToken.dto';
import { NotificationEvent } from './events/notification.event';
import { Prisma, RecipientType, UserRole } from '@prisma/client';
import { Notification } from './models/notification.model';
import { CreateNotificationInput } from './dto/createNotification.dto';

const firebase_private_key_b64 = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64,
  'base64',
);
const firebase_private_key = firebase_private_key_b64.toString('utf8');
firebase.initializeApp({
  credential: firebase.credential.cert(
    {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: firebase_private_key,
      projectId: process.env.FIREBASE_PROJECT_ID,
    },
    // path.join(__dirname, '..', '..', 'mini-store-hub-firebase-adminsdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNotifications(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();
    return notifications;
  }

  async getAllNotificationsByUserId(userId: string): Promise<Notification[]> {
    // identify recipient type from the user
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    let recipientType: RecipientType[] = ['USER'];
    switch (user.role) {
      case UserRole.ADMIN:
        recipientType = ['ALL'];
        break;
      case UserRole.RETAIL_SHOP_MANAGER:
        recipientType = ['RETAIL_SHOP', 'ALL'];
        break;
      case UserRole.WAREHOUSE_MANAGER:
        recipientType = ['WAREHOUSE', 'ALL'];
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
            id: {
              in: notificationIds,
            },
            recipientType: {
              in: recipientType,
            },
          },
        ],
      },
    });

    return readNotifications;
  }

  async getAllReadNotifications(userId: string): Promise<Notification[]> {
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
        id: {
          in: notificationIds,
        },
      },
    });

    return readNotifications;
  }

  async getAllUnreadNotifications(userId: string): Promise<Notification[]> {
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
        NOT: {
          id: {
            in: notificationIds,
          },
        },
      },
    });

    return unreadNotifications;
  }

  async sendBulkPush(payload: NotificationEvent) {
    try {
      // send bulk push notification
      const notification_title = payload.notification_title;
      const notification_body = payload.notification_body;

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

      const notification_tokens = users.map(
        (user) => user.notificationTokens[0].token,
      );

      // send notification
      await firebase.messaging().sendEachForMulticast({
        tokens: notification_tokens,
        data: {
          notification_title: notification_title,
          notification_body: notification_body,
        },

        notification: {
          title: notification_title,
          body: notification_body,
        },
      });

      // save notification on each users

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
        user: true,
      },
    });
  }

  async count(where?: Prisma.NotificationWhereInput): Promise<number> {
    return this.prisma.notification.count({ where });
  }

  async findOne(notificationId: string) {
    return this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
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
        user: true,
      },
    });
    return notifications;
  }

  async acceptPushNotification(
    user: User,
    notification_token_dto: CreateNotificationTokenInput,
  ) {
    const notification_token = this.prisma.notificationToken.upsert({
      where: {
        userId: user.id,
        token: notification_token_dto.token,
      },
      create: {
        device_type: notification_token_dto.device_type,
        token: notification_token_dto.token,
        status: true,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      update: {
        user: {
          connect: {
            id: user.id,
          },
        },
        device_type: notification_token_dto.device_type,
        token: notification_token_dto.token,
        status: true,
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

  async getNotifications() {
    const notifications = await this.prisma.notification.findMany();
    return notifications;
  }

  async sendPush(createNoficationInput: sendPushNotificationInput) {
    const { title, body, recipientType, recipientId } = createNoficationInput;
    try {
      const notification = await this.prisma.notificationToken.findFirst({
        where: { user: { id: recipientId }, status: true },
      });
      if (notification) {
        await this.prisma.notification.create({
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
        });
        await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notification.token,
            android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } catch (error) {
      return error;
    }
  }

  async markNotificationAsRead(
    notificationId: string,
    userId: string,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });

    await this.prisma.notificationRead.create({
      data: {
        notificationId,
        userId,
      },
    });

    return notification;
  }

  async sendBroadcastNotification({
    title,
    body,
    recipientType,
  }: sendPushNotificationInput): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        title,
        body,
        recipientType,
        isRead: false,
      },
    });

    return notification;
  }

  async sendIndividualNotification({
    title,
    body,
    recipientType,
    recipientId,
  }: sendPushNotificationInput): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        title,
        body,
        recipientType,
        recipientId,
        isRead: false,
      },
    });

    return notification;
  }

  async getNotificationTokens(recipientType: RecipientType) {
    let roleWhere = {};
    if (recipientType === 'ALL') {
      roleWhere = {
        NOT: {
          role: UserRole.ADMIN,
        },
      };
    } else if (recipientType === 'RETAIL_SHOP') {
      roleWhere = {
        role: UserRole.RETAIL_SHOP_MANAGER,
      };
    } else if (recipientType === 'WAREHOUSE') {
      roleWhere = {
        role: UserRole.WAREHOUSE_MANAGER,
      };
    } else {
      roleWhere = {
        role: UserRole.USER,
      };
    }

    const notificationTokens = await this.prisma.notificationToken.findMany({
      where: { user: { role: roleWhere }, status: true },
      select: {
        token: true,
      },
    });

    return notificationTokens.map(
      (notificationToken) => notificationToken.token,
    );
  }
}

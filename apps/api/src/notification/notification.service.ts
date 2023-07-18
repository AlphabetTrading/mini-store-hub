import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { User } from 'src/users/models/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationTokenInput } from './dto/createNotificationToken.dto';
import { sendPushNotificationInput } from './dto/sendPushNotification.dto';
import { UpdateNotificationTokenInput } from './dto/updateNotificationToken.dto';
import { NotificationEvent } from './events/notification.event';

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

  async sendBulkPush(payload: NotificationEvent) {
    try {
      // send bulk push notification
      const notification_title = payload.notification_title;
      const notification_body = payload.notification_body;

      const users = await this.prisma.user.findMany({
        where: {
          id: {
            in: payload.userIds,
          },
        },
        include: {
          notificationToken: true,
        },
      });

      const notification_tokens = users.map(
        (user) => user.notificationToken.notifications_token,
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
            createdBy: {
              connect: {
                id: user.id,
              },
            },
            body: notification_body,
            title: notification_title,
            status: true,
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

  async getNotificationsByUserId(user_id: string) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        createdBy: {
          id: user_id,
        },
      },
    });
    return notifications;
  }

  async getNotificationsByUserIdAndStatus(user_id: string, status: boolean) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        createdBy: {
          id: user_id,
        },
        status,
      },
      include: {
        createdBy: true,
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
      },
      create: {
        device_type: notification_token_dto.device_type,
        notifications_token: notification_token_dto.notification_token,
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
        notifications_token: notification_token_dto.notification_token,
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
    const { title, body, userId } = createNoficationInput;
    try {
      const notification = await this.prisma.notificationToken.findFirst({
        where: { user: { id: userId }, status: true },
      });
      if (notification) {
        await this.prisma.notification.create({
          data: {
            title,
            body,
            status: true,
            createdBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
        await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notification.notifications_token,
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
}

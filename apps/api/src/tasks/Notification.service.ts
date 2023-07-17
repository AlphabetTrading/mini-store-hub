import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: 'notifications',
    timeZone: 'Europe/Paris',
  })
  triggerNotifications() {
    console.log('Triggering notifications...');
  }

  @Cron('0 0 0 1 * *')
  handleMonthlyJob() {
    // This method will run on the first day of every month
    // Add your logic here
  }
}

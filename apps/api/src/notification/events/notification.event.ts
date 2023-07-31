export class NotificationEvent {
  notification_title: string;
  notification_body: string;
  tokens: string[];

  constructor(data: {
    notification_title: string;
    notification_body: string;
    tokens: string[];
  }) {
    this.notification_title = data.notification_title;
    this.notification_body = data.notification_body;
    this.tokens = data.tokens;
  }
}

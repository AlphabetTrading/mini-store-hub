export class NotificationEvent {
  notification_id: string;
  notification_title: string;
  notification_body: string;
  tokens: string[];

  constructor(data: {
    notification_id: string;
    notification_title: string;
    notification_body: string;
    tokens: string[];
  }) {
    this.notification_id = data.notification_id;
    this.notification_title = data.notification_title;
    this.notification_body = data.notification_body;
    this.tokens = data.tokens;
  }
}

export enum RecipientType {
  ALL = "ALL",
  RETAIL_SHOP = "RETAIL_SHOP",
  USER = "USER",
  WAREHOUSE = "WAREHOUSE",
}

export interface Notification {
  id: string;
  body: string;
  title: string;
  isRead: boolean;
  createdAt: Date;
  recipientType: RecipientType;
  recipientId?: string;
  notificationReads: {
    userId: string;
  }[];
}

export interface NotificationData {
  checkedAt: string;
  createdAt: string;
  id: number;
  notificationProperty: {
    contents: string;
    originId: number;
    originUserId: number;
  };
  notificationType: string;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  recipientId: number;
  recipientType: string; // Assume che RecipientType sia una stringa in TypeScript
  createdAt: string; // La data sarà rappresentata come stringa ISO8601
}

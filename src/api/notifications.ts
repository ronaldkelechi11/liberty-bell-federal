import { api } from './client';
import { Notification } from './types';

export const notificationService = {
  getMyNotifications: () => api.get<Notification[]>('/notifications/my'),
  readAll: () => api.patch<{ message: string }>('/notifications/my/read-all'),
  readOne: (id: string) => api.patch<{ message: string }>(`/notifications/my/${id}/read`),
};

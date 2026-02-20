import { axiosAuthenticatedInstance } from './client';
import { Notification } from './types';

export const notificationService = {
  getMyNotifications: () => axiosAuthenticatedInstance.get<Notification[]>('/notifications/my'),
  readAll: () => axiosAuthenticatedInstance.patch<{ message: string }>('/notifications/my/read-all'),
  readOne: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/notifications/my/${id}/read`),
};

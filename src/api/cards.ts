import { axiosAuthenticatedInstance } from './client';
import { Card, CreateCardDto, UpdateCardDto } from './types';

export const cardService = {
  requestOtp: () => axiosAuthenticatedInstance.post<{ message: string }>('/cards/request-otp'),
  createCard: (data: CreateCardDto) => axiosAuthenticatedInstance.post<Card>('/cards', data),
  getCards: () => axiosAuthenticatedInstance.get<Card[]>('/cards'),
  getCard: (id: string) => axiosAuthenticatedInstance.get<Card>(`/cards/${id}`),
  updateCard: (id: string, data: UpdateCardDto) => axiosAuthenticatedInstance.patch<Card>(`/cards/${id}`, data),
  deleteCard: (id: string) => axiosAuthenticatedInstance.delete<{ message: string }>(`/cards/${id}`),
};

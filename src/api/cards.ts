import { api } from './client';
import { Card, CreateCardDto, UpdateCardDto } from './types';

export const cardService = {
  requestOtp: () => api.post<{ message: string }>('/cards/request-otp'),
  createCard: (data: CreateCardDto) => api.post<Card>('/cards', data),
  getCards: () => api.get<Card[]>('/cards'),
  getCard: (id: string) => api.get<Card>(`/cards/${id}`),
  updateCard: (id: string, data: UpdateCardDto) => api.patch<Card>(`/cards/${id}`, data),
  deleteCard: (id: string) => api.delete<{ message: string }>(`/cards/${id}`),
};

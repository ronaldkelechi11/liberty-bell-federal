import { api } from './client';
import { PaymentMethod, CreatePaymentMethodDto, UpdatePaymentMethodDto } from './types';

export const paymentMethodService = {
  create: (data: CreatePaymentMethodDto) => api.post<PaymentMethod>('/payment-methods', data),
  getAll: () => api.get<PaymentMethod[]>('/payment-methods'),
  getOne: (id: string) => api.get<PaymentMethod>(`/payment-methods/${id}`),
  update: (id: string, data: UpdatePaymentMethodDto) => api.patch<PaymentMethod>(`/payment-methods/${id}`, data),
  delete: (id: string) => api.delete<{ message: string }>(`/payment-methods/${id}`),
};

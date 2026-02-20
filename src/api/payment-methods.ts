import { axiosAuthenticatedInstance } from './client';
import { PaymentMethod, CreatePaymentMethodDto, UpdatePaymentMethodDto } from './types';

export const paymentMethodService = {
  create: (data: CreatePaymentMethodDto) => axiosAuthenticatedInstance.post<PaymentMethod>('/payment-methods', data),
  getAll: () => axiosAuthenticatedInstance.get<PaymentMethod[]>('/payment-methods'),
  getOne: (id: string) => axiosAuthenticatedInstance.get<PaymentMethod>(`/payment-methods/${id}`),
  update: (id: string, data: UpdatePaymentMethodDto) => axiosAuthenticatedInstance.patch<PaymentMethod>(`/payment-methods/${id}`, data),
  delete: (id: string) => axiosAuthenticatedInstance.delete<{ message: string }>(`/payment-methods/${id}`),
};

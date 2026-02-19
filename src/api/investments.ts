import { api } from './client';
import { Investment, CreateInvestmentDto } from './types';

export const investmentService = {
  requestOtp: () => api.post<{ message: string }>('/investments/request-otp'),
  createInvestment: (data: CreateInvestmentDto) => api.post<Investment>('/investments', data),
  getMyInvestments: () => api.get<Investment[]>('/investments'),
};

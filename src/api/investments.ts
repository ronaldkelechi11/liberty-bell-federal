import { axiosAuthenticatedInstance } from './client';
import { Investment, CreateInvestmentDto } from './types';

export const investmentService = {
  requestOtp: () => axiosAuthenticatedInstance.post<{ message: string }>('/investments/request-otp'),
  createInvestment: (data: CreateInvestmentDto) => axiosAuthenticatedInstance.post<Investment>('/investments', data),
  getMyInvestments: () => axiosAuthenticatedInstance.get<Investment[]>('/investments'),
};

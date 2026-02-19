import { api } from './client';
import { User, Account, Investment, Notification, AnalyticsOverview, CreateTransferPinDto, AdminCreditDebitDto, UpdateLimitDto } from './types';

export const adminService = {
  updateUserTransferPin: (userId: string, data: CreateTransferPinDto) =>
    api.patch<{ message: string }>(`/admin/users/${userId}/transfer-pin`, data),

  getAccounts: (params?: { status?: string; type?: string; userId?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<Account[]>(`/admin/accounts?${query}`);
  },
  getAccount: (id: string) => api.get<Account>(`/admin/accounts/${id}`),
  requestCreditOtp: (id: string) => api.post<{ message: string }>(`/admin/accounts/${id}/credit-otp`),
  creditAccount: (id: string, data: AdminCreditDebitDto) => api.post<{ message: string }>(`/admin/accounts/${id}/credit`, data),
  debitAccount: (id: string, data: AdminCreditDebitDto) => api.post<{ message: string }>(`/admin/accounts/${id}/debit`, data),
  freezeAccount: (id: string) => api.patch<{ message: string }>(`/admin/accounts/${id}/freeze`),
  unfreezeAccount: (id: string) => api.patch<{ message: string }>(`/admin/accounts/${id}/unfreeze`),
  updateLimit: (id: string, data: UpdateLimitDto) => api.patch<{ message: string }>(`/admin/accounts/${id}/limit`, data),
  closeAccount: (id: string) => api.patch<{ message: string }>(`/admin/accounts/${id}/close`),

  getInvestments: () => api.get<Investment[]>('/admin/investments'),
  updateInvestmentStatus: (id: string, status: string) =>
    api.patch<{ message: string }>(`/admin/investments/${id}/status`, { status }),

  getAllNotifications: () => api.get<Notification[]>('/notifications/admin/all'),
  getAnalyticsOverview: () => api.get<AnalyticsOverview>('/admin/analytics/overview'),
};

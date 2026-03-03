import { axiosAuthenticatedInstance } from './client';
import { User, Account, Investment, Notification, AnalyticsOverview, CreateTransferPinDto, AdminCreditDebitDto, UpdateLimitDto, Transaction } from './types';

export const adminService = {
  updateUserTransferPin: (userId: string, data: CreateTransferPinDto) =>
    axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/users/${userId}/transfer-pin`, data),

  getAccounts: (params?: { status?: string; type?: string; userId?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const queryString = query ? `?${query}` : '';
    return axiosAuthenticatedInstance.get<Account[]>(`/admin/accounts${queryString}`);
  },
  getAccount: (id: string) => axiosAuthenticatedInstance.get<Account>(`/admin/accounts/${id}`),
  requestCreditOtp: (id: string) => axiosAuthenticatedInstance.post<{ message: string }>(`/admin/accounts/${id}/credit-otp`),
  creditAccount: (id: string, data: AdminCreditDebitDto) => axiosAuthenticatedInstance.post<{ message: string }>(`/admin/accounts/${id}/credit`, data),
  debitAccount: (id: string, data: AdminCreditDebitDto) => axiosAuthenticatedInstance.post<{ message: string }>(`/admin/accounts/${id}/debit`, data),
  freezeAccount: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/accounts/${id}/freeze`),
  unfreezeAccount: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/accounts/${id}/unfreeze`),
  updateLimit: (id: string, data: UpdateLimitDto) => axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/accounts/${id}/limit`, data),
  closeAccount: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/accounts/${id}/close`),

  getInvestments: () => axiosAuthenticatedInstance.get<Investment[]>('/admin/investments'),
  updateInvestmentStatus: (id: string, status: string) =>
    axiosAuthenticatedInstance.patch<{ message: string }>(`/admin/investments/${id}/status`, { status }),

  getAllNotifications: () => axiosAuthenticatedInstance.get<Notification[]>('/notifications/admin/all'),
  getAnalyticsOverview: () => axiosAuthenticatedInstance.get<AnalyticsOverview>('/admin/analytics/overview'),
  getUsers: () => axiosAuthenticatedInstance.get<User[]>('/admin/users'),
  getTransactions: () => axiosAuthenticatedInstance.get<Transaction[]>('/admin/transactions'),
  getUserTransactions: (userId: string) => axiosAuthenticatedInstance.get<Transaction[]>(`/admin/users/${userId}/transactions`),
};

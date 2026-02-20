import { api } from './client';
import { Account, CreateAccountDto, InternalTransferDto, ExternalTransferDto, Transaction } from './types';

export const accountService = {
  requestOtp: () => api.post<{ message: string }>('/accounts/request-otp'),
  createAccount: (data: CreateAccountDto) => api.post<Account>('/accounts', data),
  getMyAccounts: () => api.get<Account[]>('/accounts/my'),
  getAccountDetails: (id: string) => api.get<Account & { recentTransactions: Transaction[] }>(`/accounts/${id}`),
  internalTransfer: (data: InternalTransferDto) => api.post<{ message: string }>('/accounts/transfer/internal', data),
  externalTransfer: (data: ExternalTransferDto) => api.post<{ message: string }>('/accounts/transfer/external', data),
  freezeAccount: (id: string) => api.patch<{ message: string }>(`/accounts/${id}/freeze`),
  closeAccount: (id: string) => api.patch<{ message: string }>(`/accounts/${id}/close`),
  getStatement: (id: string, month: number, year: number) =>
    api.get<Transaction[]>(`/accounts/${id}/statement?month=${month}&year=${year}`),
  getAllTransactions: () => api.get<Transaction[]>('/accounts/transactions/my'),
};

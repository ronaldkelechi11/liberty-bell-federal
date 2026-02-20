import { axiosAuthenticatedInstance } from './client';
import { Account, CreateAccountDto, InternalTransferDto, ExternalTransferDto, Transaction } from './types';

export const accountService = {
  requestOtp: () => axiosAuthenticatedInstance.post<{ message: string }>('/accounts/request-otp'),
  createAccount: (data: CreateAccountDto) => axiosAuthenticatedInstance.post<Account>('/accounts', data),
  getMyAccounts: () => axiosAuthenticatedInstance.get<Account[]>('/accounts/my'),
  getAccountDetails: (id: string) => axiosAuthenticatedInstance.get<Account & { recentTransactions: Transaction[] }>(`/accounts/${id}`),
  internalTransfer: (data: InternalTransferDto) => axiosAuthenticatedInstance.post<{ message: string }>('/accounts/transfer/internal', data),
  externalTransfer: (data: ExternalTransferDto) => axiosAuthenticatedInstance.post<{ message: string }>('/accounts/transfer/external', data),
  freezeAccount: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/accounts/${id}/freeze`),
  closeAccount: (id: string) => axiosAuthenticatedInstance.patch<{ message: string }>(`/accounts/${id}/close`),
  getStatement: (id: string, month: number, year: number) =>
    axiosAuthenticatedInstance.get<Transaction[]>(`/accounts/${id}/statement?month=${month}&year=${year}`),
  getAllTransactions: () => axiosAuthenticatedInstance.get<Transaction[]>('/accounts/transactions/my'),
};

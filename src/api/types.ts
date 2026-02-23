export type AccountType = 'checking' | 'savings' | 'current' | 'investment' | 'btc';
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export type TransactionType = 'debit' | 'credit';
export type TransactionCategory = 'transfer' | 'deposit' | 'withdrawal' | 'investment';
export type CardStatus = 'active' | 'frozen' | 'expired';
export type InvestmentStatus = 'active' | 'matured' | 'cancelled';
export type InvestmentPlan = 'starter' | 'balanced' | 'advanced';
export type AccountStatus = 'active' | 'frozen' | 'closed';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  age: number;
  maritalStatus: MaritalStatus;
  dob: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isEmailVerified: boolean;
  hasTransferPin: boolean;
}

export interface RegisterDto {
  firstname: string;
  lastname: string;
  age: number;
  maritalStatus: string;
  dob: string;
  phoneNumber: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  accountType: AccountType;
  securityQuestion: string;
  securityAnswer: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface VerifyOtpDto {
  userId: string;
  otp: string;
}

export interface VerifyEmailDto {
  userId: string;
  otp: string;
}

export interface ResendVerificationDto {
  email: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export interface CreateTransferPinDto {
  pin: string;
}

export interface UpdateTransferPinDto {
  pin: string;
  otp: string;
}

export interface CreateAccountDto {
  type: AccountType;
  currency: string;
  otp: string;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  type: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  dailyLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface InternalTransferDto {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

export interface ExternalTransferDto {
  fromAccountId: string;
  recipientName: string;
  recipientAccountNumber: string;
  recipientRoutingNumber: string;
  bankName: string;
  amount: number;
  description: string;
}

export interface AdminCreditDebitDto {
  amount: number;
  description: string;
  otp: string;
}

export interface UpdateLimitDto {
  limit: number;
}

export interface CreateCardDto {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cardType: string;
  cvv?: string;
  userId?: string;
  otp: string;
}

export interface UpdateCardDto {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  status?: CardStatus;
}

export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  status: CardStatus;
  type: 'visa' | 'mastercard';
}

export interface CreateInvestmentDto {
  planId: InvestmentPlan;
  amount: number;
  accountId: string;
  otp: string;
}

export interface Investment {
  id: string;
  userId: string;
  planId: InvestmentPlan;
  amount: number;
  status: InvestmentStatus;
  startDate: string;
  endDate: string;
  expectedReturns: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AnalyticsOverview {
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalInvestments: number;
  activeAccounts: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export interface CreatePaymentMethodDto {
  name: string;
  description: string;
}

export interface UpdatePaymentMethodDto {
  name?: string;
  description?: string;
}

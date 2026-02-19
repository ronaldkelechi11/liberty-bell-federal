import { api } from './client';
import { LoginDto, RegisterDto, VerifyOtpDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto, User } from './types';

export const authService = {
  register: (data: RegisterDto) => api.post<{ message: string; userId: string }>('/auth/register', data),
  login: (data: LoginDto) => api.post<{ message: string; userId: string; token?: string; user?: User }>('/auth/login', data),
  verifyLoginOtp: (data: VerifyOtpDto) => api.post<{ token: string; user: User }>('/auth/login/otp', data),
  verifyEmail: (data: VerifyEmailDto) => api.post<{ message: string }>('/auth/verify-email', data),
  forgotPassword: (data: ForgotPasswordDto) => api.post<{ message: string }>('/auth/forgot-password', data),
  resetPassword: (data: ResetPasswordDto) => api.post<{ message: string }>('/auth/reset-password', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

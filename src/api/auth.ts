import { axiosInstance, clearTokens } from './client';
import { LoginDto, RegisterDto, VerifyOtpDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto, User } from './types';

export const authService = {
  register: (data: RegisterDto) => axiosInstance.post<{ message: string; userId: string }>('/auth/register', data),
  login: (data: LoginDto) => axiosInstance.post<{ message: string; userId: string; token?: string; user?: User }>('/auth/login', data),
  verifyLoginOtp: (data: VerifyOtpDto) => axiosInstance.post<{ token: string; user: User }>('/auth/login/otp', data),
  verifyEmail: (data: VerifyEmailDto) => axiosInstance.post<{ message: string }>('/auth/verify-email', data),
  forgotPassword: (data: ForgotPasswordDto) => axiosInstance.post<{ message: string }>('/auth/forgot-password', data),
  resetPassword: (data: ResetPasswordDto) => axiosInstance.post<{ message: string }>('/auth/reset-password', data),
  logout: () => {
    clearTokens();
  },
};

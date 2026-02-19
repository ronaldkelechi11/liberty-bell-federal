import { api } from './client';
import { User, CreateTransferPinDto, UpdateTransferPinDto } from './types';

export const profileService = {
  getProfile: () => api.get<User>('/profile'),
  uploadProfilePicture: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload<{ url: string }>('/profile/upload-profile-picture', formData);
  },
  setTransferPin: (data: CreateTransferPinDto) => api.post<{ message: string }>('/profile/transfer-pin', data),
  requestTransferPinOtp: () => api.post<{ message: string }>('/profile/transfer-pin/otp'),
  updateTransferPin: (data: UpdateTransferPinDto) => api.patch<{ message: string }>('/profile/transfer-pin', data),
};

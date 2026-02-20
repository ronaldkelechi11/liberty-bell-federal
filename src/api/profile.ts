import { axiosAuthenticatedInstance } from './client';
import { User, CreateTransferPinDto, UpdateTransferPinDto } from './types';

export const profileService = {
  getProfile: () => axiosAuthenticatedInstance.get<User>('/profile'),
  uploadProfilePicture: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosAuthenticatedInstance.post<{ url: string }>('/profile/upload-profile-picture', formData);
  },
  setTransferPin: (data: CreateTransferPinDto) => axiosAuthenticatedInstance.post<{ message: string }>('/profile/transfer-pin', data),
  requestTransferPinOtp: () => axiosAuthenticatedInstance.post<{ message: string }>('/profile/transfer-pin/otp'),
  updateTransferPin: (data: UpdateTransferPinDto) => axiosAuthenticatedInstance.patch<{ message: string }>('/profile/transfer-pin', data),
};

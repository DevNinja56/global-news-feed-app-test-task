import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { fetchRequest } from '@/utils/axios/fetch';

export const verifyUser = createAsyncThunk(
  API_ENDPOINTS.AUTH.VERIFY_USER,
  async () => {
    return await fetchRequest({ url: API_ENDPOINTS.AUTH.VERIFY_USER });
  }
);

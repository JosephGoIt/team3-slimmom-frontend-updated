import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/selectors';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Update Profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, thunkAPI) => {
    const token = getToken(thunkAPI.getState());
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      const response = await axios.put('/profile/update', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.message || 'An unexpected error occurred.';
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

// Get Current Profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI.getState());
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      const response = await axios.get('/profile/fetch', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data?.data?.dailyCalories);

      return response.data;
    } catch (error) {
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.message || 'An unexpected error occurred.';
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);
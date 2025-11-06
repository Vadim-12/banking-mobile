import { CORE_API_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const coreApi = axios.create({
	baseURL: CORE_API_URL,
	timeout: 10000,
});

coreApi.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('access_token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

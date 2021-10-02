import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

export const fetcher = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

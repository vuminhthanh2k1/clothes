import axios from 'axios';
import { apiUrl } from '../enviroment';
import { getToken } from './userToken';

export const request = axios.create({
  baseURL: apiUrl,
});

request.interceptors.request.use(config => {
  const token = getToken();
  if (config.headers && token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, error => Promise.reject(error));

import axios from 'axios';

// Use the same base URL as the main app
export const ADMIN_API_BASE_URL = 'https://api.pdfezy.com/api';

// Create axios instance for admin API calls
export const adminApi = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get auth token
export const getAdminToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper to get auth headers
export const getAdminAuthHeaders = () => {
  const token = getAdminToken();
  return {
    'Authorization': `Bearer ${token}`, // ✅ Correct format
  };
};

// Admin API functions
export const adminApiCall = {
  // Auth
  login: (email: string, password: string) =>
    adminApi.post('/admin/login', { email, password }),

  // Stats
  getStats: () =>
    adminApi.get('/admin/stats', { headers: getAdminAuthHeaders() }),

  // Users
  getUsers: (page: number, limit: number = 10, search: string = '') =>
    adminApi.get(`/admin/users?page=${page}&limit=${limit}&search=${search}`, {
      headers: getAdminAuthHeaders(),
    }),

  getUser: (id: string) =>
    adminApi.get(`/admin/users/${id}`, { headers: getAdminAuthHeaders() }),

  updateUser: (id: string, data: any) =>
    adminApi.put(`/admin/users/${id}`, data, { headers: getAdminAuthHeaders() }),

  deleteUser: (id: string) =>
    adminApi.delete(`/admin/users/${id}`, { headers: getAdminAuthHeaders() }),

  // Payments
  getPayments: (page: number, limit: number = 10) =>
    adminApi.get(`/admin/payments?page=${page}&limit=${limit}`, {
      headers: getAdminAuthHeaders(),
    }),

  refund: (subscriptionId: string) =>
    adminApi.post(`/admin/refund/${subscriptionId}`, {}, { headers: getAdminAuthHeaders() }),

  // Files
  getFiles: (page: number, limit: number = 20) =>
    adminApi.get(`/admin/pdf-files?page=${page}&limit=${limit}`, {
      headers: getAdminAuthHeaders(),
    }),

  deleteFile: (id: string) =>
    adminApi.delete(`/admin/pdf-files/${id}`, { headers: getAdminAuthHeaders() }),

  // Coupons
  getCoupons: (page: number, limit: number = 10) =>
    adminApi.get(`/admin/coupons?page=${page}&limit=${limit}`, {
      headers: getAdminAuthHeaders(),
    }),

  createCoupon: (data: any) =>
    adminApi.post('/admin/coupons', data, { headers: getAdminAuthHeaders() }),

  updateCoupon: (id: string, data: any) =>
    adminApi.put(`/admin/coupons/${id}`, data, { headers: getAdminAuthHeaders() }),

  deleteCoupon: (id: string) =>
    adminApi.delete(`/admin/coupons/${id}`, { headers: getAdminAuthHeaders() }),

  validateCoupon: (code: string, plan: string) =>
    adminApi.post('/admin/coupons/validate', { code, plan }),
};


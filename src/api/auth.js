import { axiosInstance } from '../utils/axios.js';

export default {
  // 登入
  login: (data) => {
    return axiosInstance.post('/admin/signin', data);
  },
  checkAuth: () => {
    return axiosInstance.post('/api/user/check');
  },

  // 登出
  // logout: () => axiosInstance.get('/logout'),
};

import { axiosInstance } from '../utils/axios.js';

export default {
  // 登入
  login: (data) => {
    return axiosInstance.post('/admin/signin', data);
  },

  // 登出
  // logout: () => axiosAuthInstance.get('/logout'),
};

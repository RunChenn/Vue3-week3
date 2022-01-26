import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 登入
  getProducts: (path) => {
    const pathName = path ? path : apiPath;
    console.log(pathName);
    return axiosInstance.get(`/api/${pathName}/admin/products`);
  },
};

import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 取得 商品資訊
  getProducts: () => {
    // const pathName = path ? path : apiPath;
    return axiosInstance.get(`/api/${apiPath}/admin/products`);
  },
  // 新增 商品資訊
  addProducts: (data) => {
    // const pathName = path ? path : apiPath;
    return axiosInstance.post(`/api/${apiPath}/admin/product`, data);
  },
  // 編輯 商品資訊
  updateProducts: (id, data) => {
    // const pathName = path ? path : apiPath;
    return axiosInstance.put(`/api/${apiPath}/admin/product/${id}`, data);
  },
  // 刪除 商品資訊
  delProducts: (id) => {
    // const pathName = path ? path : apiPath;
    return axiosInstance.delete(`/api/${apiPath}/admin/product/${id}`);
  },
};

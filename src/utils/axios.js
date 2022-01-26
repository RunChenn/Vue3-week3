import axios from 'axios';
import { Cookies } from './cookies.js';

const apiPath = 'aprilchen';

const axiosInstance = axios.create({
  baseURL: 'https://vue3-course-api.hexschool.io/v2',
  withCredentials: true,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  timeout: 20000,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (res) => {
    if (Cookies && Cookies.getCookie()) {
      const token = Cookies.getCookie();

      token && (res.headers.common.Authorization = token);

      // window.location.href = '/#/';
    }
    return res;
  },
  (err) => {
    console.log(error);
    return Promise.reject(err);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  async (res) => {
    // const store = useStore();
    console.log(res);
    // console.log(store.state.Global.dialogStatus);
    // await store.dispatch('Global/getDialogStatus', true);
    return res.data ? res.data : res;
  },
  (err) => {
    console.log(err.response);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          break;
        case 401:
          alert(err.response.data.message);
          window.location.href = '/#/login';
          break;
        case 403:
          alert(err.response.data.message);
          window.location.href = '/#/login';
          break;
        case 500:
          break;
        default:
          console.log(`連接錯誤${err.response.status}`);
          break;
      }
    }

    // return Error object with Promise
    return Promise.reject(err.response);
  }
);

export { axiosInstance, apiPath };

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vue3-course-api.hexschool.io/v2',
  withCredentials: true,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  timeout: 20000,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (res) => {
    // const token = store().getters['auth/accessToken'];
    // if (token) {
    //     config.headers['Authorization'] = 'Bearer ' + token;
    // }
    return res;
  },
  (err) => {
    Promise.reject(err);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  async (res) => {
    // const store = useStore();
    // console.log(res);
    // console.log(store.state.Global.dialogStatus);
    // await store.dispatch('Global/getDialogStatus', true);
    return res.data ? res.data : res;
  },
  (err) => {
    // console.log(err.response);
    if (err && err.response) {
      const errorCode =
        err.response.data.code === undefined
          ? ''
          : err.response.data.code.toString();

      switch (err.response.status) {
        case 400:
          break;
        case 500:
          // switch (errorCode) {
          //   case '500-9999':
          //     break;
          // }
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

export { axiosInstance };

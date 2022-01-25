import { createApp } from 'vue';
// 引入路由配置
import router from './router/index';
// import axios from './utils/axios.js';

import App from './App.vue';

import './scss/custom.scss';

import 'jquery';
import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');

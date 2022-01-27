<script>
import { ref } from 'vue';
import api from '../api/index.js';
import { Cookies, tokenName } from '../utils/cookies.js';

import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const login = async () => {
      const data = {
        username: email.value,
        password: password.value,
      };

      try {
        const { token, expired } = await api.auth.login(data);

        Cookies.setCookie(tokenName, token, expired);
        router.push({ name: 'Products' });
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="email"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2022~∞ - AprilChen</p>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const baseUrl = ref('https://vue3-course-api.hexschool.io/v2');

    const apiPath = ref('aprilchen');

    let products = ref([]);

    let prodInfo = ref({});

    let isEnabled = ref(false);

    // 檢查權限
    const checkAuth = () => {
      axios
        .post(`${baseUrl.value}/api/user/check`)
        .then(() => {
          getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.data.message);
          window.location = 'index.html';
        });
    };

    // 載入所有商品
    const getProducts = () => {
      axios
        .get(`${baseUrl.value}/api/${apiPath.value}/admin/products`)
        .then((res) => {
          console.log(res);

          products.value = res.data.products;

          isEnabled.value = res.data.is_enabled ? true : false;

          console.log(products);
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    };

    const prodsDetail = (item) => {
      prodInfo.value = item;
    };

    onMounted(() => {
      // 取得 Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      axios.defaults.headers.common.Authorization = token;

      checkAuth();
    });

    return {
      products,
      isEnabled,
      prodsDetail,
      prodInfo,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6">
        <h3>產品列表</h3>
        <hr />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">查看細節</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <th scope="row">{{ item.title }}</th>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>
                <!-- <span v-if="item.is_enabled" class="text-success"
                      >啟用</span
                    >
                    <span v-else>未啟用</span> -->
                <label class="form-check-label" for="flexSwitchCheckDefault">{{
                  isEnabled ? '啟用' : '未啟用'
                }}</label>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input form-check-input-checked-bg-color-success"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="isEnabled"
                  />
                </div>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="prodsDetail(item)"
                >
                  查看細節
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          目前有
          <span
            ><strong>{{ products.length }}</strong></span
          >
          項產品
        </p>
      </div>
      <div class="col-md-6">
        <h3>單一產品細節</h3>
        <hr />
        <h4>{{ prodInfo.title }}</h4>
        <div v-if="prodInfo.title">
          <div class="card mb-3">
            <img
              :src="prodInfo.imageUrl"
              class="card-img-top primary-image"
              alt="主圖"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ prodInfo.title }}
                <span class="badge bg-primary ms-2">{{
                  prodInfo.category
                }}</span>
              </h5>
              <p class="card-text">商品描述：{{ prodInfo.description }}</p>
              <p class="card-text">商品內容：{{ prodInfo.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ prodInfo.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ prodInfo.origin_price }}</del>
                </p>
                {{ prodInfo.unit }} / 元
              </div>
            </div>
          </div>
          <span v-for="(image, id) in prodInfo.imagesUrl" :key="image">
            <img
              v-if="image"
              :src="image"
              :alt="prodInfo.title"
              class="images m-2"
            />
          </span>
        </div>
        <p v-else class="text-secondary">請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

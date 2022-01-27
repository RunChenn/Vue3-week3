<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';

import { Modal } from 'bootstrap';

export default {
  setup() {
    // let isShowProdModal = ref(false);
    let productModal = ref(null);
    let delProductModal = ref(null);

    let products = ref([]);

    let prodInfo = ref({});

    let isEnabled = ref(false);

    let isNew = ref(false);

    let tempProduct = ref({ imagesUrl: [], id: '' });

    const prodsDetail = (item) => {
      prodInfo.value = item;
    };

    // 載入所有商品
    const getData = async () => {
      try {
        const prodsData = await api.products.getProducts();

        products.value = prodsData.products;
      } catch (err) {
        alert(err.message);
      }
    };

    onMounted(async () => {
      productModal.value = new Modal(document.getElementById('productModal'), {
        keyboard: false,
      });

      delProductModal.value = new Modal(
        document.getElementById('delProductModal'),
        {
          keyboard: false,
        }
      );

      try {
        // 檢查權限
        await api.auth.checkAuth();
        getData();
      } catch (err) {
        alert(err.message);
      }
    });

    const openModal = (status, item) => {
      console.log(status);
      isNew.value = status === 'new' ? true : false;

      tempProduct.value =
        status === 'new'
          ? {
              imagesUrl: [],
            }
          : { ...item };

      if (status === 'delete') {
        delProductModal.value.show();
      }
    };

    // 新增/編輯 商品
    const updateProduct = async () => {
      console.log(tempProduct.value);

      // 新增
      if (isNew.value) {
        try {
          const res = await api.products.addProducts({
            data: tempProduct.value,
          });

          console.log(res);
          alert(res.message);

          getData();

          productModal.value.hide();
        } catch (err) {
          alert(err.message);
        }

        return;
      }

      // 編輯
      try {
        const res = await api.products.updateProducts(tempProduct.value.id, {
          data: tempProduct.value,
        });

        console.log(res);
        alert(res.message);

        getData();

        productModal.value.hide();
      } catch (err) {
        alert(err.message);
      }
    };

    // 刪除商品
    const delProduct = async () => {
      try {
        const res = await api.products.delProducts(tempProduct.value.id);

        console.log(res);
        alert(res.message);

        getData();

        delProductModal.value.hide();
      } catch (err) {
        alert(err.message);
      }
    };

    // 新增圖片
    const createImages = () => {
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push('');
    };

    return {
      products,
      isEnabled,
      prodsDetail,
      prodInfo,
      tempProduct,
      isNew,
      openModal,
      updateProduct,
      delProduct,
      createImages,
    };
  },
};
</script>

<template>
  <div>
    <div class="container">
      <div class="row py-1">
        <div class="text-end mb-4">
          <button
            type="button"
            class="btn btn-success"
            @click="openModal('new')"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
          >
            建立新的產品
          </button>
        </div>
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
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="item.id">
                <th scope="row">{{ item.title }}</th>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <!-- <span v-if="item.is_enabled" class="text-success"
                      >啟用</span
                    >
                    <span v-else>未啟用</span> -->
                  <label
                    class="form-check-label"
                    :for="`switchCheckBox${index}`"
                  >
                    <span v-if="item.is_enabled" class="checked">啟用</span>
                    <span v-else>未啟用</span>
                    <!-- {{ item.is_enabled ? '啟用' : '未啟用' }} -->
                  </label>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input form-check-input-checked-bg-color-success"
                      type="checkbox"
                      role="switch"
                      :id="`switchCheckBox${index}`"
                      v-model="products[index].is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm me-2 mb-2"
                    data-bs-target="#productModal"
                    data-bs-toggle="modal"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm me-2 mb-2"
                    @click="openModal('delete', item)"
                  >
                    刪除
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
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
                  <p class="card-text me-2 text-danger">
                    ${{ prodInfo.price }}
                  </p>
                  <p class="card-text text-black-50">
                    <del>{{ prodInfo.origin_price }}</del>
                  </p>
                  {{ prodInfo.unit }} / 元
                </div>
              </div>
            </div>
            <span v-for="image in prodInfo.imagesUrl" :key="image">
              <img
                v-if="image"
                :src="image"
                :alt="prodInfo.title"
                class="images m-2"
              />
            </span>
          </div>
          <p v-else class="text-primary">請選擇一個商品查看</p>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      id="productModal"
      ref="productModal"
      class="modal fade text-start"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control mb-2"
                    placeholder="請輸入圖片連結"
                  />
                  <img class="img-fluid" :src="tempProduct.imageUrl" />
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div
                    class="mb-1"
                    v-for="(image, index) in tempProduct.imagesUrl"
                    :key="index"
                  >
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">圖片網址</label>
                      <input
                        v-model="tempProduct.imagesUrl[index]"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img class="img-fluid" :src="image" />
                  </div>
                  <div
                    v-if="
                      !tempProduct.imagesUrl.length ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.push('')"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.pop()"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      id="origin_price"
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      id="price"
                      v-model.number="tempProduct.price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div
      id="delProductModal"
      ref="delProductModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="delProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品
            <br />刪除後將無法恢復
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-success" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;

  object-fit: contain;
}

.primary-image {
  height: 300px;
}

.form-check-label span.checked {
  color: #198754;
}

.images {
  height: 150px;
}
.form-check-input:checked {
  border-color: #198754;
  background-color: #198754;
}
</style>

import { storage } from '../utils/storage'

// 模拟网络延迟辅助函数 (如果 utils/helper 不存在，可在此定义或移入 storage)
const wait = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const productAPI = {
  async getList() {
    await wait();
    return storage.getProducts();
  },

  async add(product) {
    await wait();
    return storage.addProduct(product);
  },

  async updateStatus(id, status) {
    await wait();
    return storage.updateProductStatus(id, status);
  },

  async update(id, data) {
    await wait();
    return storage.updateProduct(id, data);
  },

  async delete(id) {
    await wait();
    return storage.deleteProduct(id);
  }
};
const STORAGE_KEY = 'products_db'

export const storage = {
  getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  },

  setProducts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    // 触发 storage 事件以便其他标签页或组件同步
    window.dispatchEvent(new Event('storage'))
  },

  addProduct(product) {
    const list = this.getProducts()
    // 简单校验 SKU 唯一性
    if (list.some(p => p.sku === product.sku)) {
      throw new Error('SKU 编码已存在')
    }
    const newProduct = { ...product, id: Date.now() }
    list.unshift(newProduct)
    this.setProducts(list)
    return newProduct
  },

  updateProductStatus(id, status) {
    const list = this.getProducts()
    const index = list.findIndex(p => String(p.id) === String(id))
    if (index === -1) throw new Error('商品不存在')
    
    list[index].status = status
    this.setProducts(list)
    return list[index]
  },
  isSameProductId(originId, diffProductId) {
    return String(originId) === String(diffProductId)
  },
  updateProduct(id, data) {
    const list = this.getProducts()
    const index = list.findIndex(p => this.isSameProductId(String(p.id), String(id)))
    console.log('更新状态前列表:', list)
    console.log('更新状态:', { id })
    if (index === -1) throw new Error('商品不存在')

    // 校验 SKU 唯一性 (排除自身)
    if (list.some(p => p.sku === data.sku && !this.isSameProductId(String(p.id), String(id)))) {
      throw new Error('SKU 编码已存在')
    }

    // 合并数据，保留原有 status 等字段，除非 data 中显式覆盖
    list[index] = { ...list[index], ...data }
    this.setProducts(list)
    return list[index]
  },

  deleteProduct(id) {
    const list = this.getProducts()
    const newList = list.filter(p => p.id !== id)
    this.setProducts(newList)
    return true
  }
}
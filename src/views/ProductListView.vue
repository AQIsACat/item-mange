<template>
  <div class="product-list-view">
    <div class="header-bar">
      <h2 class="page-title">商品列表</h2>
      <button class="btn btn-add" @click="goToAdd">+ 新增商品</button>
    </div>

    <!-- 使用拆分后的筛选组件 -->
    <ProductFilterBar v-model="filterState" />
    
    <div class="list-container">
      <div v-if="productsFiltered.length === 0" class="empty-tip">
        {{ filterState.search || filterState.status ? '暂无匹配的商品' : '暂无商品数据' }}
      </div>

      <!-- 使用拆分后的商品卡片组件 -->
      <ProductCard 
        v-for="product in productsFiltered" 
        :key="product.id" 
        :product="product"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productAPI } from '../api/mock'
import ProductFilterBar from '../components/ProductFilterBar.vue'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const products = reactive([])

// 筛选状态
const filterState = reactive({
  search: '',
  status: ''
})

const loadProducts = async () => {
  try {
    const list = await productAPI.getList()
    products.splice(0, products.length, ...list.filter(p => p.status !== 'deleted'))
  } catch (e) {
    console.error('加载失败', e)
    alert('加载商品列表失败')
  }
}

const productsFiltered = computed(() => {
  return products.filter(p => {
    const matchSearch = !filterState.search || 
      p.name.toLowerCase().includes(filterState.search.toLowerCase()) || 
      p.sku.toLowerCase().includes(filterState.search.toLowerCase());
    
    const matchStatus = !filterState.status || p.status === filterState.status;

    return matchSearch && matchStatus;
  })
})

const goToAdd = () => {
  router.push('/products/add')
}

// 统一处理子组件冒泡的动作
const handleAction = async (actionType, product) => {
  switch(actionType) {
    case 'release':
      if(!confirm(`确定要提交商品 "${product.name}" 吗？`)) return
      try {
        await productAPI.updateStatus(product.id, 'published')
        alert('商品已提交，请前往审核中心。')
      } catch(e) { alert(e.message) }
      break;
      
    case 'withdraw':
      if(!confirm(`确定要撤回商品 "${product.name}" 吗？`)) return
      try {
        await productAPI.updateStatus(product.id, 'draft')
        alert('商品已撤回至草稿箱。')
      } catch(e) { alert(e.message) }
      break;

    case 'unpublish':
      if(!confirm(`确定要下架商品 "${product.name}" 吗？`)) return
      try {
        await productAPI.updateStatus(product.id, 'offline')
        alert('商品已下架。')
      } catch(e) { alert(e.message) }
      break;

    case 'publish':
      if(!confirm(`确定要直接上架商品 "${product.name}" 吗？(跳过审核)`)) return
      try {
        await productAPI.updateStatus(product.id, 'online')
        alert('商品已上架。')
      } catch(e) { alert(e.message) }
      break;

    case 'edit':
      // 如果是 offline 或 rejected 状态，先转为 draft
      if (['offline', 'rejected'].includes(product.status)) {
        if(!confirm(`编辑 ${product.status === 'offline' ? '已下架' : '已驳回'} 商品将先将其恢复为"草稿"状态。确认？`)) return
        await productAPI.updateStatus(product.id, 'draft')
        alert('已转为草稿态')
      }
      // 直接跳转编辑页（不再 alert）
      router.push(`/products/edit/${product.id}`)
      break;

    case 'delete':
      if(!confirm(`确定要删除商品 "${product.name}" 吗？`)) return
      try {
        await productAPI.delete(product.id)
      } catch(e) { alert(e.message) }
      break;
  }
}

onMounted(() => {
  loadProducts()
  window.addEventListener('storage', loadProducts)
});
</script>

<style scoped>
.product-list-view {
  padding: 16px;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.btn-add {
  padding: 6px 12px;
  background-color: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
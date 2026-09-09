<template>
  <div class="audit-view">
    <h2 class="page-title">商品审核中心</h2>
    
    <div class="empty-state" v-if="audits.length === 0">
      <p>暂无已发布待审核的商品</p>
      <p style="font-size: 12px; color: #999; margin-top: 8px;">请在商品列表中将草稿商品“发布”后，再至此审核。</p>
    </div>
    
    <div class="list-container" v-else>
      <!-- 使用拆分后的审核项组件 -->
      <AuditItem 
        v-for="item in audits" 
        :key="item.id" 
        :item="item"
        @audit="handleAudit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productAPI } from '../api/mock'
import AuditItem from '../components/AuditItem.vue'

const audits = ref([])

const loadAudits = async () => {
  try {
    const allProducts = await productAPI.getList()
    audits.value = allProducts.filter(p => p.status === 'published')
  } catch (e) {
    console.error('加载审核列表失败', e)
    audits.value = []
  }
}

const handleAudit = async (product, passed) => {
  try {
    const newStatus = passed ? 'online' : 'rejected'
    await productAPI.updateStatus(product.id, newStatus)
    
    if (passed) {
      alert(`审核通过：${product.name}，商品已正式上架至列表。`)
    } else {
      alert(`已驳回：${product.name}，商品未通过审核，状态已更新为“已驳回”，可重新编辑或发布。`)
    }
    loadAudits()
  } catch (e) {
    alert(e.message)
  }
}

onMounted(() => {
  loadAudits()
  const handleStorageChange = () => {
    loadAudits()
  }
  window.addEventListener('storage', handleStorageChange)
})
</script>

<style scoped>
.audit-view {
  padding: 16px;
}

.page-title {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
}

.empty-state {
  text-align: center;
  color: #999;
  margin-top: 40px;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
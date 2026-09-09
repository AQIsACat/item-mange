<template>
  <div class="product-item">
    <div class="product-thumb">
      <img 
        v-if="product.imageUrl" 
        :src="product.imageUrl" 
        alt="商品图片" 
        class="thumb-img"
      />
      <div v-else class="thumb-placeholder">无图</div>
    </div>
    
    <div class="product-info">
      <p class="product-id">ID: {{ product.id }}</p>
      <h3>{{ product.name }}</h3>
      <p class="sku">SKU: {{ product.sku }}</p>
      <p class="status-tag" :class="'status-' + statusClass">
        {{ statusText }}
      </p>
    </div>

    <div class="actions">
      <div class="action-group">
         <template v-if="product.status === 'online'">
           <button class="btn btn-unpublish" @click="handleAction('unpublish')">下架</button>
         </template>
         <template v-else-if="product.status === 'offline'">
            <button class="btn btn-publish" @click="handleAction('publish')">上架</button>
            <button class="btn btn-edit" @click="handleAction('edit')">编辑</button>
            <button class="btn btn-delete" @click="handleAction('delete')">删除</button>
         </template>
         <template v-else-if="product.status === 'published'">
            <button class="btn btn-withdraw" @click="handleAction('withdraw')">撤回</button>
         </template>
         <!-- 新增：已驳回状态的操作 -->
         <template v-else-if="product.status === 'rejected'">
            <button class="btn btn-release" @click="handleAction('release')">重新发布</button>
            <button class="btn btn-edit" @click="handleAction('edit')">编辑</button>
            <button class="btn btn-delete" @click="handleAction('delete')">删除</button>
         </template>
         <template v-else-if="product.status === 'draft'">
            <button class="btn btn-release" @click="handleAction('release')">发布</button>
            <button class="btn btn-edit" @click="handleAction('edit')">编辑</button>
            <button class="btn btn-delete" @click="handleAction('delete')">删除</button>
         </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router' // 引入 router
import { getStatusText, getStatusClass } from '../constants/productStatus'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['action'])
const router = useRouter()

const statusText = computed(() => getStatusText(props.product.status))
const statusClass = computed(() => getStatusClass(props.product.status))

// 统一处理子组件冒泡的动作
const handleAction = (actionType) => {
  if (actionType === 'edit') {
    // 直接跳转编辑页
    router.push(`/products/edit/${props.product.id}`)
    return
  }
  // 其他动作继续冒泡给父组件处理
  emit('action', actionType, props.product)
}
</script>

<style scoped>
.product-item {
  background: white;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 12px;
  align-items: center;
}

.product-thumb {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}

.thumb-placeholder {
  font-size: 9px;
  color: #999;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-width: 0;
}

.status-tag {
  margin: 0;
  font-size: 10px;
  line-height: 1.2;
  padding: 2px 4px;
  border-radius: 2px;
  display: inline-block;
  width: fit-content;
  font-weight: bold;
}

.status-draft { background-color: #f5f5f5; color: #666; border: 1px solid #d9d9d9; }
.status-online { background-color: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
.status-offline { background-color: #fff7e6; color: #faad14; border: 1px solid #ffd591; }
.status-submitted { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
/* 新增：已驳回状态样式 (红色警示) */
.status-rejected { background-color: #fff1f0; color: #ff4d4f; border: 1px solid #ffa39e; }

.product-id { font-size: 10px; color: #999; margin: 0; }
.product-info h3 { margin: 0; font-size: 14px; font-weight: 600; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sku { margin: 0; font-size: 11px; color: #666; }

.action-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.actions .btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-publish { background-color: #52c41a; color: white; }
.btn-unpublish { background-color: #faad14; color: white; }
.btn-edit { background-color: #1890ff; color: white; }
.btn-delete { background-color: #ff4d4f; color: white; }
.btn-release { background-color: #722ed1; color: white; }
.btn-withdraw { background-color: #faad14; color: white; }
</style>
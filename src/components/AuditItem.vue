<template>
  <div class="audit-item">
    <div class="header">
      <span class="product-name">{{ item.name }}</span>
      <span class="tagger">SKU: {{ item.sku }}</span>
    </div>
    
    <div class="content">
      <div class="preview-box" v-if="item.imageUrl">
        <img :src="item.imageUrl" alt="商品图" />
      </div>
      <div class="info-text">
        <p class="desc">当前状态：已发布 (待审核)</p>
        <p class="hint">商品已发布，请确认内容后决定是否上架销售。</p>
      </div>
    </div>
    
    <div class="actions">
      <button class="btn btn-success" @click="$emit('audit', item, true)">通过 (上架)</button>
      <button class="btn btn-warning" @click="$emit('audit', item, false)">驳回</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['audit'])
</script>

<style scoped>
.audit-item {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}

.product-name {
  font-weight: bold;
  font-size: 15px;
}

.tagger {
  font-size: 12px;
  color: #999;
}

.content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content .desc {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.preview-box img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
}

.hint {
  font-size: 12px;
  color: #1890ff;
  margin: 4px 0 0 0;
  background: #e6f7ff;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.btn-success { background-color: #52c41a; color: white; }
.btn-warning { background-color: #faad14; color: white; }
</style>
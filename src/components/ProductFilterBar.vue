<template>
  <div class="filter-bar">
    <input 
      type="text" 
      v-model="localSearch" 
      placeholder="搜索商品名称或 SKU..." 
      class="search-input"
      @input="emitChange"
    />
    <select v-model="localStatus" class="status-select" @change="emitChange">
      <option value="">全部状态</option>
      <option value="online">已上架</option>
      <option value="offline">已下架</option>
      <option value="published">已提交</option>
      <option value="draft">草稿</option>
      <option value="rejected">已驳回</option> <!-- 新增筛选选项 -->
    </select>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ search: '', status: '' })
  }
})

const emit = defineEmits(['update:modelValue'])

const localSearch = ref(props.modelValue.search)
const localStatus = ref(props.modelValue.status)

const emitChange = () => {
  emit('update:modelValue', {
    search: localSearch.value,
    status: localStatus.value
  })
}

// 监听外部变化同步本地
watch(() => props.modelValue, (newVal) => {
  localSearch.value = newVal.search
  localStatus.value = newVal.status
}, { deep: true })
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.status-select {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  min-width: 120px;
}
</style>
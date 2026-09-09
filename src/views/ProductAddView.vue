<template>
  <div class="product-add-view">
    <h2 class="page-title">新增商品</h2>
    
    <div class="form-container">
      <div class="form-item">
        <label>商品名称 <span class="required">*</span></label>
        <input type="text" v-model="form.name" placeholder="请输入商品名称" />
      </div>
      
      <div class="form-item">
        <label>SKU 编码 <span class="required">*</span></label>
        <input type="text" v-model="form.sku" placeholder="请输入 SKU 编码" :disabled="submitting" @input="clearSkuError" />
        <div v-if="skuError" class="error-msg">{{ skuError }}</div>
      </div>

      <div class="form-item">
        <label>商品图片</label>
        <input type="file" accept="image/*" @change="handleImageUpload" ref="fileInput" :disabled="submitting" />
        <div v-if="previewUrl" class="image-preview">
          <img :src="previewUrl" alt="预览" />
          <button class="btn-remove" @click="removeImage" type="button">×</button>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-cancel" @click="handleCancel" :disabled="submitting">取消</button>
        <button class="btn btn-primary" @click="handleSubmit" :disabled="!isValid || submitting">
          {{ submitting ? '提交中...' : '提交' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productAPI } from '../api/mock'

const router = useRouter()
const fileInput = ref(null)
const submitting = ref(false)
const skuError = ref('')

const form = reactive({
  name: '',
  sku: '',
  imageUrl: ''
})

const previewUrl = ref('')

const isValid = computed(() => {
  return form.name.trim() !== '' && form.sku.trim() !== '' && !skuError.value
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过 2MB')
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    form.imageUrl = e.target.result
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  form.imageUrl = ''
  previewUrl.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const clearSkuError = () => {
  if (skuError.value) {
    skuError.value = ''
  }
}

const handleSubmit = async () => {
  if (!isValid.value) return
  
  submitting.value = true
  skuError.value = ''

  const newProductData = {
    name: form.name,
    sku: form.sku,
    status: 'published', 
    imageUrl: form.imageUrl
  }
  
  try {
    await productAPI.add(newProductData)
    alert('商品发布成功！已自动进入审核流程。')
    router.push('/audit') 
  } catch (e) {
    if (e.message.includes('SKU')) {
      skuError.value = e.message
    } else {
      alert('提交失败：' + e.message)
    }
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  if(submitting.value) return
  router.back()
}
</script>

<style scoped>
.product-add-view {
  padding: 16px;
}

.page-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-item {
  margin-bottom: 20px;
  position: relative;
}

.form-item label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.required {
  color: #ff4d4f;
  margin-left: 4px;
}

.error-msg {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

.form-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-item input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-item input[type="file"] {
  width: 100%;
  padding: 8px 0;
  font-size: 13px;
  color: #666;
}

.image-preview {
  position: relative;
  margin-top: 12px;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4d4f;
  color: white;
  border: none;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-primary {
  background-color: #1890ff;
  color: white;
}

.btn-primary:disabled {
  background-color: #91d5ff;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
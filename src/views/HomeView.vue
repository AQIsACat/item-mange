<template>
  <div class="home-view">
    <!-- Banner 跑马灯 -->
    <div class="banner-container">
      <div class="banner-track">
        <div v-for="(item, index) in banners" :key="index" class="banner-item">
          {{ item.text }}
        </div>
        <!-- 复制一份以实现无缝滚动 -->
        <div v-for="(item, index) in banners" :key="'dup-'+index" class="banner-item">
          {{ item.text }}
        </div>
      </div>
    </div>

    <!-- 信息卡片 -->
    <div class="info-cards">
      <div class="card">
        <h3>今日新增</h3>
        <p class="number">128</p>
      </div>
      <div class="card">
        <h3>待审核</h3>
        <p class="number warning">45</p>
      </div>
      <div class="card">
        <h3>已完成</h3>
        <p class="number success">892</p>
      </div>
    </div>

    <!-- 其他信息 -->
    <div class="other-info">
      <h3>系统公告</h3>
      <ul>
        <li v-for="i in 3" :key="i">系统将于今晚 24:00 进行例行维护，请提前保存数据。</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const banners = ref([
  { text: '欢迎使用商品管理系统' },
  { text: '新版本上线，体验更流畅的标注功能' },
  { text: '请注意数据安全，定期修改密码' }
])
</script>

<style scoped>
.home-view {
  padding: 16px;
}

/* Banner 样式 */
.banner-container {
  width: 100%;
  overflow: hidden;
  background: #1890ff;
  color: white;
  border-radius: 8px;
  padding: 12px 0;
  margin-bottom: 20px;
  position: relative;
}

.banner-track {
  display: flex;
  width: max-content;
  animation: scroll 15s linear infinite;
}

.banner-item {
  padding: 0 40px;
  white-space: nowrap;
  font-weight: bold;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 卡片样式 */
.info-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card {
  background: white;
  flex: 1;
  margin: 0 4px;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.card h3 {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.card .number {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.card .number.warning { color: #faad14; }
.card .number.success { color: #52c41a; }

/* 其他信息 */
.other-info {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.other-info h3 {
  margin-top: 0;
  font-size: 16px;
  border-left: 4px solid #1890ff;
  padding-left: 8px;
}

.other-info ul {
  padding-left: 20px;
  color: #666;
  font-size: 14px;
}
</style>
<template>
  <div class="app-container">
    <!-- 主要内容区域 -->
    <main class="main-content">
      <slot />
    </main>

    <!-- 底部导航栏 -->
    <nav class="tab-bar">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path" 
        class="tab-item"
        active-class="active"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="label">{{ item.title }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { path: '/', title: '首页', icon: '🏠' },
  { path: '/products', title: '商品列表', icon: '📦' },
  { path: '/audit', title: '标注审核', icon: '✅' },
  { path: '/profile', title: '我的', icon: '👤' }
])
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 防止内容被底部导航遮挡 */
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  flex: 1;
  height: 100%;
}

.tab-item .icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.tab-item.active {
  color: #1890ff;
}

.tab-item.active .icon {
  transform: scale(1.1);
}
</style>
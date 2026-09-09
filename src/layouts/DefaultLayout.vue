<template>
  <div class="default-layout">
    <!-- 主要内容区域，无底部导航 -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
// 默认布局，仅用于包裹内容，无额外导航
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
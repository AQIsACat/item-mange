<template>
  <!-- App.vue 仅作为根容器，不包含任何业务判断逻辑 -->
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script setup>
import { useLayout } from './composables/useLayout'

const { currentLayout } = useLayout()
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
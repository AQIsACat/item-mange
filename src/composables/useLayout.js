import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBarLayout from '../layouts/TabBarLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// 定义布局组件映射表，方便集中管理
const LAYOUT_MAP = {
  tabBar: TabBarLayout,
  default: DefaultLayout
}

export function useLayout() {
  const route = useRoute()

  const currentLayout = computed(() => {
    // 优先从路由 meta 中获取 layout 名称，默认为 'tabBar'
    const layoutName = route.meta.layout || 'tabBar'
    
    // 根据名称返回对应的组件，如果找不到则降级为默认 TabBarLayout
    return LAYOUT_MAP[layoutName] || TabBarLayout
  })

  return {
    currentLayout
  }
}
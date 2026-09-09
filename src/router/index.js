import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductAddView from '../views/ProductAddView.vue'
import ProductEditView from '../views/ProductEditView.vue'
import AuditView from '../views/AuditView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页', icon: 'home' }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListView,
    meta: { title: '商品列表', icon: 'list' }
  },
  {
    path: '/products/add',
    name: 'product-add',
    component: ProductAddView,
    meta: { title: '新增商品', hidden: true, layout: 'default' }
  },
  {
    path: '/products/edit/:id',
    name: 'product-edit',
    component: ProductEditView,
    meta: { title: '编辑商品', hidden: true, layout: 'default' }
  },
  {
    path: '/audit',
    name: 'audit',
    component: AuditView,
    meta: { title: '商品审核', icon: 'audit' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { title: '我的', icon: 'user' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 简单的前置守卫模拟权限控制
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user_token') // 模拟检查登录状态
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果没有权限，重定向到首页或登录页，这里为了演示重定向到首页并提示
    alert('您没有权限访问标注审核页面，请先登录或联系管理员。')
    next('/')
  } else {
    next()
  }
})

export default router
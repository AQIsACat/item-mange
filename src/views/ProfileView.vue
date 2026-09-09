<template>
  <div class="profile-view">
    <div class="user-header">
      <div class="avatar">👤</div>
      <h2>宋海驰</h2>
      <p class="role">超级管理员</p>
    </div>

    <div class="form-section">
      <h3>基础信息配置</h3>
      <div class="form-item">
        <label>昵称</label>
        <input type="text" v-model="form.nickname" placeholder="请输入昵称" />
      </div>
      <div class="form-item">
        <label>手机号</label>
        <input type="tel" v-model="form.phone" placeholder="请输入手机号" />
      </div>
      <div class="form-item">
        <label>邮箱</label>
        <input type="email" v-model="form.email" placeholder="请输入邮箱" />
      </div>
      <div class="form-item">
        <label>所属部门</label>
        <select v-model="form.department">
          <option value="tech">技术部</option>
          <option value="product">产品部</option>
          <option value="ops">运营部</option>
        </select>
      </div>
      
      <button class="save-btn" @click="saveProfile">保存配置</button>
    </div>
    
    <div class="logout-section">
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nickname: 'SongHC',
  phone: '13800138000',
  email: 'song@example.com',
  department: 'tech'
})

const saveProfile = () => {
  console.log('保存配置:', form)
  // 模拟异步请求
  setTimeout(() => {
    alert('配置保存成功！')
  }, 500)
}

const logout = () => {
  localStorage.removeItem('user_token')
  alert('已退出登录')
  // 实际项目中应跳转回登录页或首页
}
</script>

<style scoped>
.profile-view {
  padding: 16px;
}

.user-header {
  text-align: center;
  background: white;
  padding: 24px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.avatar {
  font-size: 48px;
  margin-bottom: 8px;
}

.user-header h2 {
  margin: 4px 0;
  font-size: 18px;
}

.user-header .role {
  color: #1890ff;
  font-size: 12px;
  margin: 0;
}

.form-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-section h3 {
  margin-top: 0;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.form-item input,
.form-item select {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box; /* 关键：防止 padding 撑大宽度 */
}

.save-btn {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.logout-section {
  padding: 0 16px;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background-color: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>
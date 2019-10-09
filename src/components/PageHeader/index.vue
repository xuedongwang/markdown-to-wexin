<template>
  <div class="page-header">
    <div class="title">https://md2wx.com</div>
    <el-menu
      :default-active="active"
      class="header-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#373d49"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="2" disabled>
        <template slot="title">导出</template>
        <el-menu-item index="2-1">导出 PDF</el-menu-item>
        <el-menu-item index="2-2">导出 Markdown</el-menu-item>
        <el-menu-item index="2-3">导出 HTML</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>登录</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  data () {
    return {
      active: ''
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-header {
  padding: 0 20px;
  color: #fff;
  background: #373d49;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
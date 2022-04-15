<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <!-- 一级菜单标题 -->
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"> </menu-item>
    </template>
    <!-- 展开项  -->
    <el-menu-item :index="item.path" v-for="item in route.children" :key='item'>
      <menu-item :title="item.meta.title" :icon="item.meta.icon"></menu-item>
    </el-menu-item>
  </el-sub-menu>
  <!-- 渲染 item 项 没有子项的一级路由 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem'
import { defineProps } from 'vue'
// 定义 props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss" scoped>
:deep(.el-sub-menu__title) {
  display: block !important;
}
</style>

<template>
  <!-- element  icon -->

  <el-icon v-if="icon === 'avatar'" class='svg-icon'>
    <component :is='"avatar"'></component>
  </el-icon>

  <!-- 非element  icon -->
  <svg-icon v-else :icon='icon'></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang='scss' scoped></style>

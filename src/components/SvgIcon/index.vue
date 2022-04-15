<template>
  <!--  展示 外来svg图标-->
  <div
    v-if='isEValue'
    class='svg-external-icon svg-icon'
    :style='styleExternal'
    :class='className'
  ></div>
  <svg v-else class='svg-icon' :class='className' aria-hidden='true'>
    <use :xlink:href='innerIcon' />
  </svg>
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import { computed, defineProps } from 'vue'

const props = defineProps({
  // icon 图标名 如 article
  icon: {
    type: String,
    required: true
  },
  // 外部传来的 图标类名
  className: {
    type: String,
    default: ''
  }
})
// 判断是否为外来图标
const isEValue = computed(() => isExternal(props.icon))

// 外部图标样式
const styleExternal = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  'webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 内部图标 class名处理
const innerIcon = computed(() => `#icon-${props.icon}`)
</script>

<style scoped lang='scss'>
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-external-icon {
  display: inline-block;
  mask-size: cover !important;
  background-color: currentColor;
}
</style>

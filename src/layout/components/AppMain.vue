<template>
  <div class='app-main'>
    <router-view v-slot='{ Component, route }'>
      <transition name='fade-transform' mode='out-in'>
        <keep-alive>
          <component :is='Component' :key='route.path' />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { isTags } from '@/utils/tags'

const route = useRoute()
const store = useStore()

const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

watch(
  route,
  (to, from) => {
    // 如果是 404 login等路由 则返回
    if (!isTags(to.path)) return
    store.commit('app/addTagsViewList', {
      ...to,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

watchSwitchLang(() => {
  const list = store.getters.tagsViewList.map((route) => {
    route.title = getTitle(route)
    return route
  })
  store.commit('app/changeTagsView', list)
})
</script>

<style lang='scss' scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>

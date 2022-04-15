<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

onMounted(() => {
  store.dispatch('user/isCheck', route.path)
})
</script>

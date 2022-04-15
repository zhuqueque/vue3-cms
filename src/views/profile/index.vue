<template>
  <div class="my-container">
    <!-- 组件介绍 : appmain中 个人中心页面组件 -->
    <!-- el-row 定义一行容器 容器内的el-col定义列 所在行一共分成24等分 由span属性决定当前列的宽度 -->
    <el-row>
      <el-col :span="6">
        <!-- 左侧 介绍卡片 -->
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <!-- 右侧 tabs卡片 -->
        <el-card>
          <el-tabs v-model="activeName">
            <!-- activeName 的值 feature | chapter | author-->
            <!-- :label 属性为 tab选项占位文本  -->
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <!-- 项目功能 组件 -->
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <!-- 角色 组件 -->
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <!-- 作者组件 -->
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'

import { watchSwitchLang } from '@/utils/i18n'
import { feature } from '@/api/getData'
const activeName = ref('feature')

const featureData = ref([])

const getFeatureData = async () => {
  const { data } = await feature()
  featureData.value = data.data
}

getFeatureData()
// 语言切换 重新获取 数据
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>

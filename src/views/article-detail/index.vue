<template>
  <div class="article-detail-container">
    <h2 class="title">{{ articleDetail.title }}</h2>
    <div class="header">
      <span class="author"
        >{{ $t('msg.article.author') }}：{{ articleDetail.author }}</span
      >
      <span class="time"
        >{{ $t('msg.article.publicDate') }}：{{ articleDetail.date }}</span
      >
      <el-button type="text" class="edit" @click="onEditClick()">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <div class="content" v-html="articleDetail.content"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { getArticleDetail } from '@/api/article'
import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const articleDetail = ref({})
const store = useStore()
const router = useRouter()
onMounted(async () => {
  const { data } = await getArticleDetail({
    id: props.id
  })
  articleDetail.value = data.result
  dayjs.extend(rt)
  articleDetail.value.date = dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(articleDetail.value.date))
})

const onEditClick = () => {
  router.push(`/article/editor/${articleDetail.value._id}`)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vue.scss';
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>

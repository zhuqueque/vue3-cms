<template>
  <div class='article-create'>
    <el-card>
      <el-input
        class='title-input'
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model='title'
        maxlength='20'
        clearable
      >
      </el-input>
      <br />
      <el-input
        class='title-input'
        :placeholder="$t('msg.article.desPlaceholder')"
        v-model='describe'
        maxlength='20'
        clearable
      >
      </el-input>
      <el-tabs v-model='activeName'>
        <el-tab-pane :label="$t('msg.article.markdown')" name='markdown'>
          <markdown
            :title='title'
            :des='describe'
            :detail='detail'
            @onSuccess='onSuccess'
          ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name='editor'>
          <editor
            :title='title'
            :des='describe'
            :detail='detail'
            @onSuccess='onSuccess'
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { onMounted, ref, watch, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/article'

const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const activeName = ref('markdown')
const title = ref('')
const describe = ref('')
const onSuccess = () => {
  title.value = ''
  describe.value = ''
}
watch(
  route,
  async (newRoute) => {
    if (articleId) {
      const { data } = await getArticleDetail({
        id: articleId
      })
      detail.value = data.result
      // 标题赋值
      title.value = detail.value.title
      describe.value = detail.value.describe
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang='scss' scoped>
.title-input {
  margin-bottom: 20px;
}
</style>

<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, watch, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { submitArticle, editArticle } from './submit'
import { ElMessage } from 'element-plus'
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  des: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])
// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const onSubmitClick = async () => {
  const htmlStr = mkEditor.getHTML()
  if (!props.title) {
    return ElMessage.error('标题不能为空')
  }
  if (!props.des) {
    return ElMessage.error('描述不能为空')
  }
  if (htmlStr === '<p><br class="ProseMirror-trailingBreak"></p>') {
    return ElMessage.error('内容不能为空')
  }

  if (props.detail && props.detail._id) {
    // 编辑文章提交
    await editArticle({
      _id: props.detail._id,
      title: props.title,
      describe: props.des,
      content: htmlStr
    })
  } else {
    // 新建文章提交
    await submitArticle({
      content: htmlStr,
      title: props.title,
      describe: props.des
    })
  }

  mkEditor.reset()
  emits('onSuccess')
}

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>

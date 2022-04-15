<template>
  <div class='editor-container'>
    <div id='editor-box'></div>
    <div class='bottom'>
      <el-button type='primary' @click='onSubmitClick'>{{
          $t('msg.article.commit')
        }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, watch, defineProps, defineEmits } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
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
const store = useStore()
// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const onSubmitClick = async () => {
  const htmlStr = editor.txt.html()
  if (htmlStr === '') {
    return ElMessage.error('内容不能为空')
  }
  if (!props.title) {
    return ElMessage.error('标题不能为空')
  }
  if (!props.des) {
    return ElMessage.error('描述不能为空')
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
  editor.txt.html('')
  emits('onSuccess')
}

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang='scss' scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>

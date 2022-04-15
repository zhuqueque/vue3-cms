<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAllUser } from '@/api/getUser'
import { watchSwitchLang } from '@/utils/i18n'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()
const excelName = ref('')
const emits = defineEmits(['update:modelValue'])
let exportDefaultName = i18n.t('msg.excel.defaultName')
excelName.value = exportDefaultName

watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'title'
}

// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'title') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((title) => title.title))
      }
      return item[headers[key]]
    })
  })
}
const onConfirm = async () => {
  loading.value = true
  let { data } = await getAllUser()
  data = formatJson(USER_RELATIONS, data.data)
  console.log(data)
  const excel = await import('@/utils/Export2Excel')
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}
</script>

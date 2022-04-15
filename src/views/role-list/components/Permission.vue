<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value='modelValue'
    @close='closed'
  >
    <el-tree
      ref='treeRef'
      :data='allPermission'
      show-checkbox
      check-strictly
      node-key='id'
      default-expand-all
      :props='defaultProps'
    >
    </el-tree>

    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='closed'>{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type='primary' @click='onConfirm'>{{
            $t('msg.universal.confirm')
          }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { nextTick, ref, defineProps, defineEmits } from 'vue'
import { getPermission } from '@/api/getData'
import { filterPermission } from './filterPermission'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  rolePermission: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const allPermission = ref([])
const treeRef = ref(null)
// 确定按钮点击事件

const onConfirm = async () => {
  closed()
}
const getAllpermission = async () => {
  const { data } = await getPermission()
  allPermission.value = data
}
getAllpermission()

const checkedKeys = filterPermission(props.rolePermission)

nextTick(() => {
  treeRef.value.setCheckedKeys(checkedKeys)
})

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
</script>

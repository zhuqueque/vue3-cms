<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { useRouter } from 'vue-router'
import { uploadUser } from '@/api/uploadUser'

import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const i18n = useI18n()
const USER_RELATIONS = {
  username: '姓名',
  mobile: '联系方式',
  title: '角色'
}

// 筛选数组
const generateData = (result) => {
  return result.map((item) => {
    const user = {}
    for (const key in item) {
      if (key === USER_RELATIONS.username) {
        user.username = item[key]
      } else if (key === USER_RELATIONS.mobile) {
        user.mobile = item[key]
      } else if (key === USER_RELATIONS.title) {
        user.title = [{ title: item[key] }]
      }
    }
    return user
  })
}
const onSuccess = async (excelData) => {
  const resultArr = generateData(excelData.results)
  console.log(resultArr)
  // 发起请求 然后触发重新获取 userList
  const { data } = await uploadUser(resultArr)
  if (data.code === 0) {
    ElMessage.success({
      message: data.len + i18n.t('msg.excel.importSuccess'),
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped></style>

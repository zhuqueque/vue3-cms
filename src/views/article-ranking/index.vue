<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="item in tableColumns"
          :label="item.label"
          :prop="item.prop"
          :key='item'
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>

            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, articleDelete } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const router = useRouter()
const i18n = useI18n()
// 获取数据的方法
const getListData = async () => {
  const { data } = await getArticleList({
    page: page.value,
    size: size.value
  })
  // 加载相对时间插件
  data.result.forEach((item) => {
    dayjs.extend(rt)

    item.date = dayjs()
      .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
      .to(dayjs(item.date))
  })
  tableData.value = data.result
  total.value = data.total
}

getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理数据不重新加载的问题
onActivated(getListData)
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

const onShowClick = async (row) => {
  router.push({
    path: `/article/${row._id}`
  })
}
const onRemoveClick = async (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await articleDelete({
        id: row._id
      })
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
    .catch(() => {
      ElMessage.info(i18n.t('msg.article.cancelDelete'))
    })
}
onMounted(() => {
  initSortable(tableData, getListData)
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
}
</style>

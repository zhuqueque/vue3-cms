<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <!-- 需要绑定到 tableData 则使用prop  不需要 则通过插槽的方式 插入dom 需要使用作用域插槽获取 row 当前单元格数据  -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.photo"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.title">
              <el-tag
                size="small"
                v-for="(item, index) in row.title"
                :key="index"
              >
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <!-- 作用域 插槽 -->
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}
            </el-button>
            <el-button
              type="info"
              size="small"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteUserClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <export-excel v-model="exportToExcelVisible"></export-excel>
  </div>
</template>

<script setup>
import ExportExcel from './components/Export2Excel.vue'
import { ref, onActivated } from 'vue'
import { getUserList, deleteUser } from '@/api/getUser'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const exportToExcelVisible = ref(false)

// 获取数据的方法
const getListData = async () => {
  const { data } = await getUserList({
    page: page.value,
    size: size.value
  })
  tableData.value = data.result
  console.log(tableData.value)
  total.value = data.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  console.log(currentSize)
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

// 导入 excel
const onImportExcelClick = () => {
  router.push('/user/import')
}

onActivated(getListData)

// 删除用户
const deleteUserClick = async (row) => {
  const { data } = await deleteUser(row)
  if (data.code === 0) {
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  }
}

// 导出
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

// 查看按钮点击事件
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>

<template>
  <div class="">
    <el-card>
      <el-table
        :data="rolesList"
        border
        style="width: 100%"
        table-layout="auto"
      >
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="des">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onPermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <Permission
      v-model="distributePermissionVisible"
      :rolePermission="rolePermission"
      v-if="distributePermissionVisible"
    ></Permission>
  </div>
</template>

<script setup>
import { getRolesList } from '@/api/getUser'
import Permission from './components/Permission.vue'
import { ref } from 'vue'
const rolesList = ref([])
const distributePermissionVisible = ref(false)
const rolePermission = ref({})
const getRoles = async () => {
  const { data } = await getRolesList()
  rolesList.value = data.data
}
const onPermissionClick = (row) => {
  distributePermissionVisible.value = true
  rolePermission.value = row.permission
  console.log(row.permission)
}
getRoles()
</script>

<style lang="scss" scoped></style>

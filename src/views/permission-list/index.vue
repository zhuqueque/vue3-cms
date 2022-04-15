<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        table-layout="auto"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { getPermission } from '@/api/getData'
import { ref } from 'vue'
const allPermission = ref([])
const getAllpermission = async () => {
  const { data } = await getPermission()
  allPermission.value = data
  console.log(data)
}
getAllpermission()
</script>

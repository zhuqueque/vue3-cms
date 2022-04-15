import { ref } from 'vue'
import Sortable from 'sortablejs'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  // 设置拖拽效果
  const el = tableRef.value.$el.querySelector(
    '.el-table__body tbody'
  )
  // 1.要拖拽的元素
  // 2.配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调
    async onEnd(event) {
      const {
        newIndex,
        oldIndex
      } = event
      const result = await articleSort({
        init: tableData.value[oldIndex],
        final: tableData.value[newIndex]
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess')
      })
      tableData.value = []
      cb()
    }
  })
}

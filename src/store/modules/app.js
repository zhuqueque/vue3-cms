import { LANG, TAGS_VIEW } from '@/assets/js/constant.js'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        const isUserInfoIndex = state.tagsViewList.findIndex(item => {
          return item.name === tag.name && item.name
        })
        if (isUserInfoIndex > -1) { // 存在 用户信息
          state.tagsViewList[isUserInfoIndex] = tag
        } else {
          state.tagsViewList.push(tag)
        }
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    changeTagsView(state, list) {
      state.tagsViewList = list
      setItem(TAGS_VIEW, list)
    },
    removeTagsView(state, {
      index,
      type
    }) {
      switch (type) {
        case 'index':
          state.tagsViewList.splice(index, 1)
          break
        case 'right':
          state.tagsViewList.splice(index + 1)
          break
        case 'other':
          state.tagsViewList = [state.tagsViewList[index]]
          break
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }

  },
  actions: {}
}

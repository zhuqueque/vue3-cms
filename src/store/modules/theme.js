import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/assets/js/constant'
import variable from '@/assets/scss/variable.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variable: {
      ...variable,
      menuBg: getItem(MAIN_COLOR) || DEFAULT_COLOR
    }
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
      state.variable.menuBg = newColor
    }
  }
}

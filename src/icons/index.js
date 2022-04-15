// 在这里 将svg文件中的资源 注册为全局资源
// 在main中 use 运行 并在这里讲 SvgIcon组件注册为全局组件
import SvgIcon from '@/components/SvgIcon'
import * as ElIconModules from '@element-plus/icons-vue'

// 使用 webpack的 require 来注册 svg资源
//                              搜索目录    不搜索子目录   匹配文件
const svgRequire = require.context('./svg', false, /\.svg$/) // 返回 require函数
// 可接收一个参数 用于require导入

svgRequire.keys().forEach((svgIcon) => {
  svgRequire(svgIcon)
}) // 完成本地svg导入

// 统一注册Icon图标
export default (app) => {
  // 在这里 全局注册了
  app.component('svg-icon', SvgIcon)

  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
}

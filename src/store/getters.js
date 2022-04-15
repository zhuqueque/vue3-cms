const getters = {
  cssVar: state => state.theme.variable,
  sidebarOpened: state => state.app.sidebarOpened,
  userInfo: state => state.user.userInfo,

  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}
export default getters

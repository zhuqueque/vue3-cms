import { login, isCheck } from '@/api/sys'
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import router from '../../router'

export default {
  namespaced: true,
  state: () => ({
    userInfo: {}
  }),
  actions: {
    login(context, userInfo) {
      const {
        username,
        password
      } = userInfo

      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(({ data }) => {
            if (data.code === 0) {
              ElMessage.success(data.txt)
              router.push('/')
              context.commit('storeUserInfo', data.data)
              resolve()
            } else {
              // reject()
              ElMessage.error(data.txt || '操作失败')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    isCheck(context, path) {
      return new Promise((resolve, reject) => {
        isCheck()
          .then(({ data }) => {
            if (data.code === 0) {
              context.commit('storeUserInfo', data.data)
            } else {
              router.push('/login')
            }
            resolve()
          })
          .catch(err => {
            router.push('/login')
            reject(err)
          })
      })
    }
  },
  mutations: {
    storeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  }
}

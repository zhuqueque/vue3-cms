import request from '@/utils/request'

// 登录api
export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export const isCheck = () => {
  return request({
    url: '/login/isCheck',
    method: 'get'
  })
}

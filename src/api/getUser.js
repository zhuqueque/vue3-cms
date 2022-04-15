import request from '@/utils/request'

export const getUserList = (data) => {
  return request({
    url: '/user/userList',
    params: data
  })
}

export const deleteUser = (data) => {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

export const getAllUser = () => {
  return request({
    url: '/user/allUserList'
  })
}

export const getUserDetail = (data) => {
  return request({
    method: 'post',
    url: '/user/getUserDetail',
    data
  })
}

export const getRolesList = () => {
  return request({
    url: '/user/rolesList'
  })
}

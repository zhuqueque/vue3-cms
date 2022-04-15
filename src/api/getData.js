import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/getData/feature'
  })
}

export const chapter = () => {
  return request({
    url: '/getData/chapter'
  })
}

export const getPermission = () => {
  return request({
    url: '/getData/allPermission'
  })
}

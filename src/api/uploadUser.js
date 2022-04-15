import request from '@/utils/request'

export const uploadUser = (data) => {
  return request({
    url: '/user/uploadUser',
    method: 'POST',
    data
  })
}

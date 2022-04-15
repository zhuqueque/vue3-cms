import request from '@/utils/request'

export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}

export const getArticleDetail = (data) => {
  return request({
    url: '/article/articleDetail',
    params: data
  })
}

export const articleSort = data => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

export const articleDelete = data => {
  return request({
    url: '/article/delete',
    params: data
  })
}

export const articleEdit = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}

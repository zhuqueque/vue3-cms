import _ from 'lodash'

export const setItem = (key, value) => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  // console.log(typeof value);
  if (typeof value === 'object') {
    value = _.cloneDeep(value)
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key)
    if (value === null || value === undefined || value === '') {
      return null
    }
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key)
  }
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export const removeAllItem = (key) => {
  window.localStorage.clear()
}

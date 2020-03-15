import request from './network.js'

export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
}
export function getGoods(type, page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}
import request from '@/utils/request'

/**
 *搜索联想数据列表
 *搜索关键词 q
 */
export const getSUggetList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 *获取搜索结果列表
 *page 当前是第几页 per_page每页数量 q搜索关键词
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page, per_page, q

    }
  })
}

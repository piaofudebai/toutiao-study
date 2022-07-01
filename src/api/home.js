import request from '@/utils/request'

export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/*
* 获取文章列表
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}
/*
* 获取所有列表
 */
// eslint-disable-next-line camelcase
export const getAllArticleList = () => {
  return request({
    url: 'channels'

  })
}
/*
* 频道数据持久化
 */
// eslint-disable-next-line camelcase
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }

  })
}

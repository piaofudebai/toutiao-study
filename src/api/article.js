import request from '@/utils/request'

export const getArticle = (article_id) => {
  // console.log(this.article_id)
  return request({
    url: `/articles/${article_id}`
  })
}
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/*
*收藏
*/
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/*
*取消收藏
*/
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/article/collections/${target}`
  })
}

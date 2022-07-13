/*
*获取短信验证码
*/
import request from '@/utils/request'
// import store from '@/store'
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/*
* 登录
* @paeam {mobile,code} param0
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/*
* 获取用户个人资料
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      // Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/*
*用户个人资料
 */
export const getUserProfile = () => {
  return request({
    url: 'user/profile'
  })
}

export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/* 更新头像
* 头像裁剪之后的数据 data
 */
export const updateAvatar = data => {
  return request({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}

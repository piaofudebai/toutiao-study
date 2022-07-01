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

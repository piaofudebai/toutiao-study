<template>
  <div class="My">
    <!-- 已登录 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            src="userInfo.photo"
          /><span>{{ userInfo.name }}</span>
        </div>
        <button class="button" @click="$router.push('/user')">编辑资料</button>
      </div>
      <ul class="list">
        <li>
          <span>{{ userInfo.art_count }}</span>
          <p>头条</p>
        </li>
        <li>
          <span>{{ userInfo.follow_count }}</span>
          <p>关注</p>
        </li>
        <li>
          <span>{{ userInfo.fans_count }}</span>
          <p>粉丝</p>
        </li>
        <li>
          <span>{{ userInfo.like_count }}</span>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- /未登录 -->
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 收藏历史 -->
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- /收藏历史 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小江同学" is-link />
    </van-cell-group>
    <van-button type="default" block v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log('my错了', err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    color: #ffffff;
    padding-left: 6px;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .button {
    width: 115px;
    height: 35px;
    line-height: 32px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 16px;
    font-size: 15px;
    font-weight: normal;
    color: #666666;
    border: none;
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding-left: 14px;
      font-size: 30px;
      font-weight: normal;
      color: #ffffff;
    }
  }
}
.list {
  display: flex;

  li {
    flex: 1;
    text-align: center;
    color: #ffffff;
    span {
      font-size: 36px;
    }
    p {
      font-size: 23px;
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-button {
  color: #d86262;
  font-size: 30px;
}
.van-cell-group {
  margin: 9px 0;
}
</style>

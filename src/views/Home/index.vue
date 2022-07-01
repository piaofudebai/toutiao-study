<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="gengduo" @click="isChannelPanelshow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="gengduo1"></div>
      </template>
    </van-tabs>
    <!-- 点击更多弹出层 -->
    <van-popup
      v-model="isChannelPanelshow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelshow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
    <!-- /点击更多弹出层 -->
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () { this.getMyChannels() },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelshow: false

    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const { data } = await getMyChannels()
          // console.log(data)
          this.channels = data.data.channels
          // console.log(this.list)
        } catch (err) {
          console.log('home', err)
        }
      }
    }
  },
  computed: {},
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  border: none;
}
// unset:把本来设置的属性去掉
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.gengduo {
  min-width: 100px;
  width: 66px;
  height: 88px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  line-height: 88px;
  text-align: center;
}
.gengduo1 {
  min-width: 100px;
  width: 66px;
  background-color: rgba(255, 255, 255, 0.9);
}
.toutiao {
  font-size: 30px;
}
/deep/.van-tabs__wrap {
  width: 750px;

  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>

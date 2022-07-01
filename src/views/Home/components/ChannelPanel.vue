<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          round
          plain
          size="mini"
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="index">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- /我的频道 -->
    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col
          span="6"
          v-for="(item, index) in recommendChannels"
          :key="index"
        >
          <div class="inner" van-ellipsis @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- /我的频道 -->
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录过
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log('我是arr', arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true // 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 36px;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: normal;
  line-height: 86px;
  color: #222222;
  text-align: center;
  margin-left: 14px;
  margin-bottom: 29px;
  position: relative;
  .van-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>

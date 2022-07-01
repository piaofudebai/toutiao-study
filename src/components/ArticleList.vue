<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  created () {
    this.getArticleList()
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted () {
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const { data } = await getArticleList({
          channel_id: this.id,
          timestamp: this.timestamp
        })
        // console.log(data)
        this.timestamp = data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...data.data.results)
        this.loading = false
      } catch (err) {
        console.log('获取文章列表', err)
      }
    },
    onLoad () {
      // 异步更新数据
      this.getArticleList()
    },
    onRefresh () {
      // console.log('下拉刷新触发了')
      this.finished = false // 防止用户把加载更多搞结束了
      this.loading = true// 重新加载数据loading
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>

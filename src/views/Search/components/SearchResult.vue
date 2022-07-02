<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  created () { this.getSearchResult() },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
      isLoading: false

    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // console.log(res)
        this.list.push(...res.data.data.results)
        this.loading = false
        this.isLoading = false
        // console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>

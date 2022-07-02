<template>
  <div>
    <van-search
      v-model="searchText"
      show-action
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @cancel="$router.go(-1)"
      @search="onSearch"
      autofocus
      @focus="isSearch = false"
    />
    <search-history v-if="searchText === ''"
    @search="onSearch"></search-history>
    <template v-else>
      <search-result
      v-if="isSearch"
      :searchText="searchText"
      ></search-result>
      <search-suggest
        v-else
        :searchText="searchText"
        @search="onSearch($event)"
      ></search-suggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'SearchIndex',
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.isSearch = true
      this.searchText = str
      // console.log(str)
      this.$store.commit('setsearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
</style>

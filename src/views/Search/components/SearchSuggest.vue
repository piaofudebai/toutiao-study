<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      :title="item"
      @click="$emit('search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSUggetList } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      list: []
    }
  },
  methods: {

    //* 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v-htm1 v-htm1是属性绑定，所以不能用过滤器所以只能在methods中写
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          // console.log(newVal)
          try {
            const { data } = await getSUggetList(newVal)
            // console.log(data)
            this.list = data.data.options
            console.log(this.list)
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true // 立即监听 组件在创建的时候就会监听一次
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>

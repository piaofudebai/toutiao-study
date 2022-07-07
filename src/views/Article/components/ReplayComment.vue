<template>
  <div>
    <van-nav-bar :title="title" fixed @click-left="$emit('close')">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell value="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        plain
        block
        round
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- 添加弹出层 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () { this.getCommentList() },
  data () {
    return {
      offset: null,
      limit: 999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        // console.log(res)
        this.list = res.data.data.results
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.bottom {
  position: fixed;
  height: 110px;
  width: 750px;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: rgb(226, 184, 191);
  /deep/.van-button {
    border: none;
    color: rgb(126, 187, 126);
  }
}
.comment1 {
  margin-bottom: 110px;
}
</style>

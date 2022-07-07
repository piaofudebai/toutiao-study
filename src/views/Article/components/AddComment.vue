<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    ref="field"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        class="btn"
        @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'AddComment',
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(data)
        this.$emit('add-comment', data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-unused-expressions
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  button {
    bottom: none;
  }
}
</style>

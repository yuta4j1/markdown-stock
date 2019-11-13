<template>
  <div class="post-table__container">
    <div class="post-table__column--conteiner">
      <div class="post-table__column--long">タイトル</div>
      <div class="post-table__column--long">カテゴリ</div>
      <div class="post-table__column--long">投稿日時</div>
      <div class="post-table__column--long">更新日時</div>
      <div class="post-table__column"></div>
    </div>
    <div v-for="(post, idx) in posts" :key="idx">
      <PostPanel :post="post" :showModal="showDeleteModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PostPanel from "../components/PostPanel.vue";
import { Post } from "../models/Post";

@Component({
  components: {
    PostPanel
  }
})
export default class PostTable extends Vue {
  @Prop() readonly posts: Post[] = [];
}
</script>

<style lang="scss" scoped>
.post-table__container {
  max-width: 1180px;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 16px;
}
.post-table__column--conteiner {
  display: flex;
  padding: 8px;
  border-bottom-style: solid;
  border-width: 0.5px;
  border-color: #e0e0e0;
}

.post-table__column {
  margin: 0px 20px 0px 20px;
  width: 100px;
}

.post-table__column--long {
  margin: 0px 20px 0px 20px;
  width: 200px;
}
</style>
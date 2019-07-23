<template>
    <div class="pp__container">
      <div class="long-part">タイトル</div>
      <div class="long-part">カテゴリ</div>
      <div class="part">コメント</div>
      <div class="long-part">投稿日時</div>
      <div class="long-part">更新日時</div>
      <div class="part"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PostPanelHeader extends Vue {

} 
</script>

<style scoped>
.pp__container {
    display: flex;
    justify-content: center;
    padding: 8px;
    border-bottom-style: solid;
    border-width: 0.5px;
    border-color: #E0E0E0;
}

.part {
    margin: 0px 20px 0px 20px; 
    width: 100px;
}

.long-part {
    margin: 0px 20px 0px 20px; 
    width: 200px;
}

</style>
<template>
  <div class="pp__container">
      <div class="part">{{ post.id }}</div>
      <div class="long-part">{{ post.title }}</div>
      <div class="part">{{ post.remarks }}</div>
      <div class="long-part">{{ post.insertDateTime }}</div>
      <div class="long-part">{{ post.updateDateTime }}</div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Post } from '../models/Post'

@Component
export default class PostPanel extends Vue {
    @Prop() readonly post: Post

}
</script>

<style scoped>
.pp__container {
    display: flex;
    justify-content: center;
    padding: 8px;
    border-top-style: solid;
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

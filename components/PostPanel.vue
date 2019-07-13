<template>
  <div class="pp__container">
      <div class="long-part">
          <nuxt-link @click.native.prevent="onEditLinkClick" to="/editor">
          <div class="edit-link">
              <font-awesome-icon icon="pen" />
          </div>
          </nuxt-link>
      </div>
      <div class="long-part">{{ post.title }}</div>
      <div class="long-part">{{ categories }}</div>
      <div class="part">{{ post.remarks }}</div>
      <div class="long-part">{{ post.insertDateTime }}</div>
      <div class="long-part">{{ post.updateDateTime }}</div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'
import { Post } from '../models/Post'

@Component
export default class PostPanel extends Vue {
    @Prop() readonly post: Post

    get categories() {
        return this.post.tags.join(', ')
    }

    onEditLinkClick() {
        console.log('[PostPanel] onEditLinkClick')
        // set a post object to edit on Editor view
        vxm.post.setOnEditPost(this.post.id)
    }

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

.edit-link {
    display: flex;
    justify-content: center;
    padding: 4px;
    border-style: solid;
    border-width: 0.8px;
    border-color: #00E676;
    border-radius: 4px;
    width: 64px;
    height: 20px;
    cursor: pointer;
}

.edit-link:hover {
    background-color: #00E676;
    transition-property: background;
    transition-duration: 0.1s;
    transition-timing-function: ease;
}
</style>

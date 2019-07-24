<template>
  <div class="pp__container">
      <div class="long-part">
          <nuxt-link class="edit-link" @click.native.prevent="onEditLinkClick" to="/editor">{{ post.title }}</nuxt-link>
      </div>
      <div class="long-part">{{ categories }}</div>
      <div class="part">{{ post.remarks }}</div>
      <div class="long-part">{{ post.insertDateTime }}</div>
      <div class="long-part">{{ post.updateDateTime }}</div>
      <div class="part">
        <div class="post-operation" @mouseover="showTooltip" >
          <font-awesome-icon icon="ellipsis-h" />
        </div>
        <div v-if="toggleTooltip" @mouseover="showTooltip" @mouseleave="hideTooltip" class="post-operation-tooltip">
          <div class="tooltip-link">テキストの編集</div>
          <div class="tooltip-link" @click="onDeleteClick">テキストの削除</div>
        </div>
      </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'
import { Post } from '../models/Post'

@Component
export default class PostPanel extends Vue {
    @Prop() readonly post: Post

    @Prop() showModal: () => void

    private tooltipState: boolean = false

    get categories() {
        return this.post.tags.join(', ')
    }

    get toggleTooltip() {
        console.log(this.tooltipState)
        return this.tooltipState
    }

    showTooltip() {
        console.log('show')
        this.tooltipState = true
    }

    hideTooltip() {
        console.log('hide')
        this.tooltipState = false
    }

    onEditLinkClick() {
        console.log('[PostPanel] onEditLinkClick')
        // set a post object to edit on Editor view
        vxm.post.setOnEditPost(this.post.id)
    }

    onDeleteClick() {
        console.log('[PostPanel] onDeleteClick')
        vxm.post.setDeleteDocId(this.post.id)
        this.showModal()
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
    text-decoration: none;
}

.edit-link:hover {
    color: #8705f7;
    transition-property: background;
    transition-duration: 0.1s;
    transition-timing-function: ease;
}

.post-operation {
    position: static;
    cursor: pointer;
}

.post-operation-tooltip {
    border-style: solid;
    border-color: #F5F5F5;
    border-width: 0.5px;
    border-radius: 8px;
    z-index: 1;
    position: absolute;
    background: #FAFAFA;
}

.tooltip-link {
    margin: 4px;
    padding: 4px;
    font-size: 0.9rem;
    cursor: pointer;
}

.tooltip-link:hover {
    background: #EEEEEE;
    border-radius: 4px;
}
</style>

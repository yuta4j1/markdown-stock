<template>
  <div class="panel__container">
    <div class="panel__column--long">
      <nuxt-link
        class="panel__to-edit-link"
        @click.native.stop.prevent="onEditLinkClick"
        to="/editor"
      >{{ post.title }}</nuxt-link>
    </div>
    <div class="panel__column--long">{{ categories }}</div>
    <div class="panel__column--long">{{ post.insertDateTime }}</div>
    <div class="panel__column--long">{{ post.updateDateTime }}</div>
    <div class="panel__column">
      <div class="post-operation" @mouseover="showTooltip">
        <font-awesome-icon icon="ellipsis-h" />
      </div>
      <div
        v-if="toggleTooltip"
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
        class="post-operation-tooltip"
      >
        <div class="tooltip-link">テキストの編集</div>
        <div class="tooltip-link" @click="onDeleteClick">テキストの削除</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { vxm } from "../store/store.vuex";
import { Post } from "../models/Post";

@Component
export default class PostPanel extends Vue {
  @Prop() readonly post: Post;

  @Prop() showModal: () => void;

  private tooltipState: boolean = false;

  get categories() {
    return this.post.tags.join(", ");
  }

  get toggleTooltip() {
    console.log(this.tooltipState);
    return this.tooltipState;
  }

  showTooltip() {
    console.log("show");
    this.tooltipState = true;
  }

  hideTooltip() {
    console.log("hide");
    this.tooltipState = false;
  }

  onEditLinkClick() {
    console.log("[PostPanel] onEditLinkClick");
    // set a post object to edit on Editor view
    vxm.post.setOnEditPost(this.post.id);
  }

  onDeleteClick() {
    console.log("[PostPanel] onDeleteClick");
    vxm.post.setDeleteDocId(this.post.id);
    this.showModal();
  }
}
</script>

<style lang="scss" scoped>
.panel__container {
  display: flex;
  padding: 8px;
  border-bottom-style: solid;
  border-width: 0.5px;
  border-color: #e0e0e0;
  font-family: "Quicksand", sans-serif;
}

.panel__column {
  margin: 0px 20px 0px 20px;
  width: 100px;
}

.panel__column--long {
  margin: 0px 20px 0px 20px;
  width: 200px;
}

.panel__to-edit-link {
  text-decoration: none;
  color: #59248a;
  font-weight: 500;
}

.panel__to-edit-link:hover {
  color: #ab8ec4;
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
  border-color: #f5f5f5;
  border-width: 0.5px;
  border-radius: 8px;
  z-index: 1;
  position: absolute;
  background: #fafafa;
}

.tooltip-link {
  margin: 4px;
  padding: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.tooltip-link:hover {
  background: #eeeeee;
  border-radius: 4px;
}
</style>

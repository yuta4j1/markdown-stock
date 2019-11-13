<template>
  <div class="menu__content">
    <div class="menu-area">
      <div class="menu-main">
        <div class="menu__logo">
          <font-awesome-icon icon="layer-group" size="lg" />
          <p class="menu__logo--text">Markdown Stock</p>
        </div>
      </div>
    </div>
    <div class="menu__item">
      <nuxt-link @click.native.prevent="onEditLinkClick" class="menu__to-edit-button" to="/editor">
        新規作成
        <font-awesome-icon icon="edit" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { vxm } from "../store/store.vuex";

@Component
export default class MenuBar extends Vue {
  onEditLinkClick() {
    // 新規文書なので、空文字を設定する
    vxm.post.setOnEditPost("");
  }
}
</script>

<style scoped>
.menu-main {
  font-size: 1.2rem;
}

.menu__content {
  position: relative;
  top: 0;
  width: 100vw;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #eeeeee;
  background-color: #ffffff;
  z-index: 2;
}
.menu-area {
  /* position: fixed; */
  width: 64%;
  display: flex;
  justify-content: left;
}

.menu__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu__logo--text {
    margin-left: 12px;
    font-family: "Quicksand", sans-serif;
}

.menu__to-edit-button {
  text-decoration: none;
  padding: 8px;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #212121;
}

@keyframes mouseon-edit {
  0% {
    background-color: #f5f5f5;
  }
  60% {
    background-color: #eeeeee;
  }
  100% {
    background-color: #e0e0e0;
  }
}

.menu__to-edit-button:hover {
  animation: mouseon-edit 0.1s forwards;
}
</style>

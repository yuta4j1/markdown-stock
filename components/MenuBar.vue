<template>
<div class="menu-wrapper">
    <div class="menu-area">
        <div class="menu-main"><p>Markdown Stock</p></div>
    </div>
    <div class="menu-item">
        <nuxt-link @click.native.prevent="onEditLinkClick" class="edit-btn" to="/editor">
            新規作成 
            <font-awesome-icon icon="edit" />
        </nuxt-link>
    </div>
</div>
    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'

@Component
export default class MenuBar extends Vue {

    onEditLinkClick() {
        // 新規文書なので、空文字を設定する
        vxm.post.setOnEditPost("")
    }

}
</script>

<style scoped>
.menu-main {
    font-size: 1.2rem;
}

.menu-wrapper {
    position: fixed;
    width: 100vw;
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 2.0px;
    border-bottom-color: #EEEEEE;
    opacity: 0.8;
    background-color: #FFFFFF;
    z-index: 2;
}
.menu-area {
    /* position: fixed; */
    width: 64%;
    display: flex;
    justify-content: left;
}

.edit-btn {
    text-decoration: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #F5F5F5;
    color: #212121;
}

@keyframes mouseon-edit {
    0% {
        background-color: #F5F5F5;
    }
    60% {
        background-color: #EEEEEE;
    }
    100% {
        background-color: #E0E0E0;
    }
}

.edit-btn:hover {
    animation: mouseon-edit 0.1s forwards;
}



</style>

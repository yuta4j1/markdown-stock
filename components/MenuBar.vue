<template>
<div class="menu-wrapper">
    <div class="menu-area">
        <div class="menu-item"><p>Markdown Stock</p></div>
    </div>
</div>
    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MenuBar extends Vue {

}
</script>

<style scoped>
.menu-wrapper {
    position: fixed;
    width: 100vw;
    height: 7%;
    display: flex;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-width: 2.0px;
    border-bottom-color: #EEEEEE;
}
.menu-area {
    /* position: fixed; */
    width: 64%;
    display: flex;
    justify-content: left;
}

</style>

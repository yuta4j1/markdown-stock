<template>
    <div id="app">
        <Login />
      <Grance />
      <nuxt-link to="/editor">to editor</nuxt-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Grance from './Grance.vue'
import Login from './Login.vue';

@Component({
    components: { Grance, Login }
},)
export default class Index extends Vue {
    message: string = 'hoge'
}
</script>

<style>
#app {
    font-family: 'M PLUS 1p', sans-serif;
}
</style>

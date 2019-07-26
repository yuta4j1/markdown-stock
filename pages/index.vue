<template>
    <div id="app">
      <Login />
      <nuxt-link to="/grance">一覧画面へ</nuxt-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from './Login.vue';

@Component({
    components: { Login }
},)
export default class Index extends Vue {

}
</script>

<style>
body {
    font-family: 'M PLUS 1p', sans-serif;
}
</style>

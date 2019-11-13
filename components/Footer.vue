<template>
  <div class="footer"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  height: 24px;
}
</style>
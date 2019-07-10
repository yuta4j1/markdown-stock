<template>
  <div>
      <div class="backdrop" :style="styleShow" />
      <div class="modalFrame" :class="currModalClass">
          <slot></slot>
      </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {

    @Prop(Boolean) isOpen: boolean

    get styleShow() {
        return this.isOpen ? { 'display': 'block' } : { 'display': 'none' } 
    }

    get currModalClass() {
      return this.isOpen ? { 'fadeShow': true, 'fadeHide': false } : 
      { 'fadeShow': false, 'fadeHide': true }
    }

}
</script>

<style scoped>

.modalFrame {
  visibility: hidden;
  border-radius: 5px;
  background-color: #FFFFFF;
  text-align: center;
  vertical-align: middle;
/*   border-style: solid; */
  border-width: 1px;
  height: 200px;
  width: 380px;
  position: fixed;
  top: 8%;
  left: 40%;
  z-index: 2;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.fadeShow {
    visibility: visible;
    animation-name: fadeIn;
    animation-duration: 0.2s;
    animation-timing-function: linear;
}

.fadeHide {
  visibility: hidden;
  animation-name: fadeOut;
  animation-duration: 0.2s;
  animation-timing-function: linear;
}

.backdrop {
  display: none;
  position: fixed;
  opacity: 0.7;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #424242;
  z-index: 1;
}

@keyframes fadeIn {
  from {
    top: 0%;
    opacity: 0;
  }
  to {
    top: 8%;
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    visibility: visible;
    top: 8%;
    opacity: 1;
  }
  to {
    visibility: hidden;
    top: 0%;
    opacity: 0;
  }
}


</style>


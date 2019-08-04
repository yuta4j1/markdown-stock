<template>
    <div v-if="isShow" class="loading">
        <div class="wrapper">
            <div class="circle one"></div>
            <div class="circle two"></div>
        </div>
        <div class="backdrop"></div>
    </div>
    
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'

@Component
export default class Loading extends Vue {

    get isShow() {
        return vxm.loading.loadingState.show
    }

    mounted() {
        console.log('[Loading mounted]')
    }
}

</script>

<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #FAFAFA;
  opacity: 0.8;
  z-index: 98;
}

.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: 99;
}

@keyframes spin {
	0% {-webkit-transform: rotate(0deg) translateY(-100%) scale(0);}
	50% {-webkit-transform: rotate(180deg) translateY(-100%) scale(2.2);}
  100% {-webkit-transform: rotate(360deg) translateY(-100%) scale(0);}
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #616161;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  opacity: 0.6;
  transform: scale(0);
}

.one {
  animation: spin 2s linear infinite;
}

.two {
  animation: spin 2s linear 1s infinite;
}
</style>
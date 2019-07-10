<template>
  <div>
    <p>{{ message }}</p>
    <div class="button-area">
      <button @click="onOk">ok</button>
      <button>キャンセル</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DialogMessage extends Vue {

    @Prop(String) message: string

    @Prop() onClose: () => void

    onOk() {
      this.onClose()
    }

}
</script>

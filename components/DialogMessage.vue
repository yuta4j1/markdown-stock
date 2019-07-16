<template>
  <div>
    <p>{{ message }}</p>
    <div class="button-area">
      <button @click="onOkClick">OK</button>
      <button @click="onCancelClick">キャンセル</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DialogMessage extends Vue {

    @Prop(String) message: string

    @Prop() onOk: () => void

    @Prop() onClose: () => void

    onOkClick() {
      this.onOk()
    }

    onCancelClick() {
      this.onClose()
    }

}
</script>

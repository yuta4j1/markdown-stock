<template>
  <div>
    <div class="text-area" :class="msgTextClass">
      <p>{{ msgProps.message.message }}</p>
    </div>
    <div class="button-area">
      <div class="btn ok-btn" @click="onOkClick">OK</div>
      <div class="btn cancel-btn" @click="onCancelClick">キャンセル</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Message, DialogMessageProps } from '../models/Message';

type MessageTypeClass = {
  'success': boolean,
  'confirm': boolean,
  'error': boolean
}

@Component
export default class DialogMessage extends Vue {

    @Prop() msgProps: DialogMessageProps

    get msgTextClass(): MessageTypeClass {
      switch (this.msgProps.message.type) {
        case 'success':
          return {
            'success': true,
            'confirm': false,
            'error': false
          }
        case 'confirm':
          return {
            'success': false,
            'confirm': true,
            'error': false
          }
        case 'error':
          return {
            'success': false,
            'confirm': false,
            'error': true
          }
      }
    }

    onOkClick() {
      this.msgProps.onOk()
    }

    onCancelClick() {
      this.msgProps.onCancel()
    }

}
</script>

<style scoped>

.text-area {
  border-radius: 8px;
}

.success {
  background-color: #9CCC65;
}

.confirm {
  background-color: #F5F5F5;
}

.error {
  background-color: #ef5350;
}

.button-area {
  display: flex;
  justify-content: center;
}

.btn {
  cursor: pointer;
  height: 30px;
  width: auto;
  margin: 4px;
  padding: 4px;
  background-color: #F5F5F5;
}

</style>

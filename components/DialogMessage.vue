<template>
  <div class="dialog__content">
    <div class="dialog__message-area" :class="msgTextClass">
      <p>{{ msgProps.message.message }}</p>
    </div>
    <div class="dialog__button-area">
      <nuxt-link
        v-if="msgProps.okIsLink"
        @click.native.stop.prevent="onOkClick"
        class="dialog__button--link"
        to="/grance"
      >OK</nuxt-link>
      <div v-else class="dialog__button dialog__button--ok" @click="onOkClick">OK</div>
      <div class="dialog__button dialog__button--cancel" @click="onCancelClick">キャンセル</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message, DialogMessageProps } from "../models/Message";

type MessageTypeClass = {
  success: boolean;
  confirm: boolean;
  error: boolean;
};

@Component
export default class DialogMessage extends Vue {
  @Prop() msgProps: DialogMessageProps;

  get msgTextClass(): MessageTypeClass {
    switch (this.msgProps.message.type) {
      case "success":
        return {
          success: true,
          confirm: false,
          error: false
        };
      case "confirm":
        return {
          success: false,
          confirm: true,
          error: false
        };
      case "error":
        return {
          success: false,
          confirm: false,
          error: true
        };
    }
  }

  onOkClick() {
    this.msgProps.onOk();
  }

  onCancelClick() {
    this.msgProps.onCancel();
  }
}
</script>

<style lang="scss" scoped>
.dialog__content {
  font-family: "Noto Sans JP", sans-serif;
}

.dialog__message-area {
  padding: 12px;
  font-family: "Noto Sans JP", sans-serif;
}

// .success {
//   background-color: #9ccc65;
// }

// .confirm {
//   background-color: #f5f5f5;
// }

// .error {
//   background-color: #ef5350;
// }

.dialog__button-area {
  display: flex;
  justify-content: center;
}

.dialog__button--ok {
  background-color:#9ccc65;
}

.dialog__button {
  cursor: pointer;
  height: 30px;
  width: 80px;
  text-align: center;
  margin: 24px 12px 0px 12px;
  padding: 8px;
  border-radius: 8px;
}

.dialog__button--cancel {
  @extend .dialog__button;
  &:hover {
    background-color: #EAEBEC;
  }
}

.dialog__button--link {
  @extend .dialog__button;
  text-decoration: none;
  color: white;
  background-color: #65EEDD;
  &:hover {
    background-color: #5AD2C3;
  }
}
</style>

<template>
  <div class="editor-page">
    <div class="content">
      <div class="row">
        <textarea id="title" cols="200" rows="1" placeholder="input title" v-model="post.title"></textarea>
      </div>
      <div class="row">
        <textarea
          id="tagarea"
          cols="150"
          rows="1"
          placeholder="ex) JavaScript,Vue.js,firebase..."
          v-model="tagString"
        ></textarea>
      </div>
      <div class="row">
        <textarea id="editor" class="wide-textarea" rows="30" v-model="post.content"></textarea>
        <div id="previewer" class="wide-textarea" rows="30" v-html="parsedMarkdownText" readonly></div>
      </div>
      <div class="button-area">
        <button class="btn-plain post" @click="onPostClick">投稿</button>
        <button class="btn-plain return" @click="onReturnClick">戻る</button>
      </div>
      <Modal :isOpen="dialogOpen">
        <DialogMessage :msgProps="dialogMessage" />
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as markedParser from "@yuta4j1/marked-wasm";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import uuidv4 from "uuid/v4";
import db from "../plugins/firestore";
import { vxm } from "../store/store.vuex";
import { Post } from "../models/Post";
import { EditorState } from "../models/EditorState";
import { Message, DialogMessageProps } from "../models/Message";
import DialogMessage from "../components/DialogMessage.vue";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    Modal,
    DialogMessage
  }
})
export default class Editor extends Vue {
  private post: Post = vxm.post.getEditPost || {
    id: "",
    title: "",
    tags: [],
    content: "",
    ownerId: "",
    remarks: "",
    insertDateTime: "",
    updateDateTime: ""
  };

  private tagString: string =
    this.post.tags.length > 0 ? this.post.tags.join(",") : "";

  private modalOpen: boolean = false;

  private postConfirmMessage: DialogMessageProps = {
    message: {
      type: "confirm",
      message: "テキストを投稿します。よろしいですか？"
    },
    okIsLink: false,
    onOk: this.doPost,
    onCancel: this.modalClose
  };
  get dialogMessage(): DialogMessageProps {
    return this.postConfirmMessage;
  }

  get parsedMarkdownText(): string {
    return markedParser.parse(this.post.content);
  }

  get dialogOpen(): boolean {
    return this.modalOpen;
  }

  modalClose() {
    this.modalOpen = false;
    console.log("close modal.");
  }

  onPostClick() {
    // setting 'DialogMessage' props
    this.postConfirmMessage = {
      message: {
        type: "confirm",
        message: "テキストを投稿します。よろしいですか？"
      },
      okIsLink: false,
      onOk: this.doPost,
      onCancel: this.modalClose
    };
    this.modalOpen = true;
  }

  onReturnClick() {
    // setting 'DialogMessage' props
    this.postConfirmMessage = {
      message: {
        type: "confirm",
        message:
          "一覧画面に戻ります。\n現在編集中のデータは保存されません。よろしいですか？"
      },
      okIsLink: true,
      onOk: () => {
        // 一覧画面に遷移する際に、ストアの post ID をリセットするイベント
        vxm.post.setOnEditPost("");
      },
      onCancel: this.modalClose
    };
    this.modalOpen = true;
  }

  doPost() {
    const userInfo = vxm.user.userInfo;
    dayjs.locale("ja");
    const id = uuidv4();
    // TODO validation check
    if (this.post.id === "") {
      // IDが空文字の場合、新規文書とみなし新規データ登録を行う
      const aPost: Post = {
        id: id,
        title: this.post.title,
        tags: this.tagString.split(",").map(v => v.trim()),
        content: this.post.content,
        ownerId: userInfo.uid,
        remarks: "",
        insertDateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateDateTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
      };
      db.collection("posts")
        .doc(id)
        .set(aPost)
        .then(result => {
          console.log(result);
          console.log("insert success!");
          // TODO ストアの更新
          this.modalClose();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // IDが空文字以外の場合、文書の更新を行う
      const docRef = db.collection("posts").doc(this.post.id);
      docRef
        .update({
          title: this.post.title,
          tags: this.tagString.split(",").map(v => v.trim()),
          content: this.post.content,
          ownerId: userInfo.uid,
          remarks: "",
          updateDateTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
        })
        .then(result => {
          console.log(result);
          console.log("update success!");
          // TODO ストアの更新
          this.modalClose();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-page {
  display: flex;
  justify-content: center;
  padding: 8px;
}
.row {
  margin: 24px auto;
  display: flex;
  justify-content: center;
}
.content {
  width: 95%;
  font-family: "Sarabun", sans-serif;
}

#title {
  border-width: 3px;
  border-radius: 5px;
  height: 30px;
  font-size: 1.8rem;
  border-color: #f5f5f5;
  resize: none;
  padding: 4px;
}

#tagarea {
  border-width: 2.8px;
  border-radius: 5px;
  height: 30px;
  font-size: 1.3rem;
  padding: 4px;
  border-color: #f5f5f5;
  resize: none;
}

#editor {
  box-shadow: 0px 0px 6px 0px #b3b3b3 inset;
  font-family: "Sarabun", sans-serif;
  resize: none;
}
#previewer {
  padding-left: 24px;
  border: solid;
  border-color: #c0c0c0;
  border-width: 1px;
}
.wide-textarea {
  width: 100%;
  font-size: 1.2rem;
  overflow: auto;
  border-color: #eeeeee;
}

.button-area {
  display: flex;
  justify-content: right;
  margin-top: 10px;
  padding: 10px;
}

.btn-plain {
  margin: 4px;
  padding: 5px;
  border-style: solid;
  border-width: 0.8px;
  border-radius: 24px;
  font-size: 1.2rem;
  font-weight: 20;
  width: 96px;
  height: 38px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

@keyframes bg-color__return {
  0% {
    background-color: #e3f2fd;
    color: #e0e0e0;
  }
  60% {
    background-color: #eeeeee;
    color: #eeeeee;
  }
  100% {
    background-color: #e0e0e0;
    color: #e3f2fd;
  }
}

@keyframes bg-color__post {
  0% {
    background-color: #c8e6c9;
    color: #81c784;
  }
  60% {
    background-color: #a5d6a7;
    color: #a5d6a7;
  }
  100% {
    background-color: #81c784;
    color: #fafafa;
  }
}

.return {
  color: #e0e0e0;
  border-color: #e0e0e0;
  border-width: 2px;
}

.return:hover {
  animation: bg-color__return 0.1s forwards;
}

.post {
  color: #81c784;
  border-color: #81c784;
  border-width: 2px;
}

.post:hover {
  animation: bg-color__post 0.1s forwards;
}
</style>

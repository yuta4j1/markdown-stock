<template>
    <div class="content">
        <div class="row">
            <textarea id="title" cols="200" rows="1" placeholder="input title" v-model="title"></textarea>
        </div>
        <div class="row">
            <textarea id="editor" class="wide-textarea" rows="30" v-model="inputText"></textarea>
            <div id="previewer" class="wide-textarea" rows="30" v-html="parsedMarkdownText" readonly></div>
        </div>
        <div class="button-area">
            <div class="btn-plain post" @click="onPost">投稿</div>
            <div class="btn-plain save">一時保存</div>
        </div>
        <Modal :isOpen="dialogOpen">
            <DialogMessage :message="message" :onClose="modalClose" />
        </Modal>
    </div>    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as markedParser from '@yuta4j1/marked-wasm'
import { Post } from '../models/Post'
import db from '../plugins/firestore'
import { vxm } from '../store/store.vuex'
import DialogMessage from '../components/DialogMessage.vue'
import Modal from '../components/Modal.vue'

@Component({
    components: {
        Modal,
        DialogMessage
    }
})
export default class Editor extends Vue {

    private title: string = ''
    private inputText: string = ''
    private modalOpen: boolean = false
    private message: string = "テキストを投稿します。よろしいですか？"
    modalClass = {
      'fadeShow': false,
    //   'hide': true,
      'fadeHide': false
    }

    get parsedMarkdownText(): string {
        return markedParser.parse(this.inputText)
    }

    get dialogOpen(): boolean {
        return this.modalOpen
    }

    modalClose() {
        
        this.modalClass = {
          'fadeShow': false,
        //   'hide': false,
          'fadeHide': true
        }
        this.modalOpen = false
        console.log('close modal.')
    }

    onPost() {
        this.modalOpen = true
        this.modalClass = {
            'fadeShow': true,
            // 'hide': false,
            'fadeHide': false
        }
        // const userInfo = vxm.user.userInfo
        // const aPost: Post = {
        //     id: '1',
        //     title: this.title,
        //     tags: ['ok', 'test'],
        //     content: this.inputText,
        //     ownerId: userInfo.uid,
        //     remarks: 'aaa',
        //     insertDateTime: 'insD',
        //     updateDateTime: 'updD'
        // }
        // db.collection('posts').doc(userInfo.uid).set(aPost).then(result => {
        //     console.log(result)
        //     console.log('success!!')
        // }).catch(err => {
        //     console.log('oops. perhaps occurered error...')
        // })
    }
}

</script>

<style scoped>
.row {
    margin: 0px auto;
    display: flex;
    justify-content: center;
}
.content {
    font-family: 'Sarabun', sans-serif;
}
.content > .row > #title {
    margin: 20px 20px;
    font-size: 2.0rem
}
#title {
    border-width: 0.8px;
    border-radius: 5px;
    height: 30px;
}
#editor {
    box-shadow: 0px 0px 6px 0px #B3B3B3 inset;
    font-family: 'Sarabun', sans-serif;
}
#previewer {
    padding: 4px;
    border: solid;
    border-color: #C0C0C0;
    border-width: 1px;
}
.wide-textarea {
    width: 100%;
    font-size: 1.2rem;
    overflow: auto;
    border-color: #EEEEEE;
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
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 20;
    width: 88px;
    height: 32px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}

@keyframes bg-color__post {
    0% {
        background-color: #E3F2FD;
        color: #90CAF9;
    }
    60% {
        background-color: #BBDEFB;
        color: #BBDEFB;
    }
    100% {
        background-color: #90CAF9;
        color: #FAFAFA;
    }
}

@keyframes bg-color__save {
    0% {
        background-color: #C8E6C9;
        color: #81C784;
    }
    60% {
        background-color: #A5D6A7;
        color: #A5D6A7;
    }
    100% {
        background-color: #81C784;
        color: #FAFAFA;
    }
}

.post {
    color: #90CAF9;
    border-color: #90CAF9;
    border-width: 2px;
}

.post:hover {
    animation: bg-color__post 0.1s forwards;
}

.save {
    color: #81C784;
    border-color: #81C784;
    border-width: 2px;
}

.save:hover {
    animation: bg-color__save 0.1s forwards;
}

</style>

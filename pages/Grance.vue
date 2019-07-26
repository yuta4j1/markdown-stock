<template>
  <div class="grance">
    <MenuBar />
    <div class="p__container">
        <div class="p__table">
        <PostPanelHeader />
        <div v-for="(post, idx) in posts" :key="idx">
            <PostPanel :post="post" :showModal="showDeleteModal" />
        </div>
        </div>
        <Modal :isOpen="dialogOpen">
            <DialogMessage :msgProps="deleteConfirmMsg" :onOk="doDelete" :onClose="modalClose" />
        </Modal>
    </div>
    <div>
    <nuxt-link class="to-editor-btn" to="/editor">
        <font-awesome-icon icon="edit" size="2x" />
    </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'
import db from '../plugins/firestore'
import { Post } from '../models/Post'
import { Message, DialogMessageProps } from '../models/Message'
import MenuBar from '../components/MenuBar.vue'
import PostPanel from '../components/PostPanel.vue'
import PostPanelHeader from '../components/PostPanelHeader.vue'
import Modal from '../components/Modal.vue'
import DialogMessage from '../components/DialogMessage.vue'

@Component({
    components: { PostPanelHeader, PostPanel, Modal, DialogMessage, MenuBar }
})
export default class Grance extends Vue {
    posts: Post[] = []

    dialogOpen: boolean = false

    deleteConfirmMsg: DialogMessageProps = {
        message: {
          type: 'confirm',
          message: "テキストを削除します。よろしいですか？"
        },
        okIsLink: false,
        onOk: this.doDelete,
        onCancel: this.modalClose
    }

    mounted() {
        vxm.post.fetchPosts().then((data: Post[]) => {
            this.posts = data
        })
    }

    showDeleteModal() {
        this.dialogOpen = true
    }

    doDelete() {
        const docId = vxm.post.deleteDocId
        console.log('[Grance] doDelete: docId', docId)
        db.collection('posts').doc(docId).delete().then(result => {
            console.log(result)
            console.log('delete success!')
            this.modalClose()
        }).catch(err => {
            console.log(err)
            // TODO error 
        })
    }

    modalClose() {
        this.dialogOpen = false
        console.log('close modal.')
    }
}
</script>

<style scoped>

.p__container {
    display: flex;
    justify-content: center;
    margin: 0;
    padding-top: 90px;
    padding-right: 0px;
    width: 95%;
}

.to-editor-btn {
    /* position: fixed; */
    top: 10%;
    left: 92%;
    text-decoration: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #212121;
    box-shadow: 10px 10px 10px rgba(0,0,0,0.4);

}

</style>

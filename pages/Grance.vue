<template>
  <div>
    <Loading />
    <div class="grance__content">
      <MenuBar />
      <div class="t__header">
        <div class="filter-area">
          <input class="filter-text" type="text" v-model="filterKey" placeholder="Filter" />
        </div>
      </div>
      <div class="grance__table--outline">
        <PostTable :posts="filteredPosts" />
      </div>
    </div>
    <Footer />
    <Modal :isOpen="dialogOpen">
      <DialogMessage :msgProps="deleteConfirmMsg" :onOk="doDelete" :onClose="modalClose" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { vxm } from "../store/store.vuex";
import db from "../plugins/firestore";
import { Post } from "../models/Post";
import { Message, DialogMessageProps } from "../models/Message";
import MenuBar from "../components/MenuBar.vue";
import Footer from "../components/Footer.vue";
import PostPanel from "../components/PostPanel.vue";
import PostTable from "../components/PostTable.vue";
import PostPanelHeader from "../components/PostPanelHeader.vue";
import Modal from "../components/Modal.vue";
import DialogMessage from "../components/DialogMessage.vue";
import Loading from "../components/Loading.vue";
import dayjs from "dayjs";

@Component({
  components: {
    PostPanelHeader,
    PostTable,
    PostPanel,
    Modal,
    DialogMessage,
    MenuBar,
    Footer,
    Loading
  }
})
export default class Grance extends Vue {
  posts: Post[] = [];

  filterKey: string = "";

  dialogOpen: boolean = false;

  deleteConfirmMsg: DialogMessageProps = {
    message: {
      type: "confirm",
      message: "テキストを削除します。よろしいですか？"
    },
    okIsLink: false,
    onOk: this.doDelete,
    onCancel: this.modalClose
  };

  get filteredPosts(): Post[] {
    if (this.filterKey === "") {
      return this.posts;
    } else {
      return this.posts.filter((p: Post) => {
        // partially match the title
        if (p.title.includes(this.filterKey)) {
          return true;
        }
        // partially match tags
        if (p.tags.some(t => t.includes(this.filterKey))) {
          return true;
        }
        return false;
      });
    }
  }

  mounted() {
    console.log("[Grance mouted]");
    // ローディング表示
    this.updateGrance();
  }

  updateGrance() {
    vxm.loading.toggleLoading(true);
    const userInfo = vxm.user.userInfo
    vxm.post.fetchPosts(userInfo).then((data: Post[]) => {
      const sorted = data.sort((a: Post, b: Post) => {
        const aTime = dayjs(a.updateDateTime);
        const bTime = dayjs(b.updateDateTime);
        if (aTime.isBefore(bTime)) {
          return 1;
        }
        if (aTime.isAfter(bTime)) {
          return -1;
        }
        return 0;
      });
      this.posts = sorted;
      vxm.loading.toggleLoading(false);
    });
  }

  showDeleteModal() {
    this.dialogOpen = true;
  }

  doDelete() {
    const docId = vxm.post.deleteDocId;
    console.log("[Grance] doDelete: docId", docId);
    db.collection("posts")
      .doc(docId)
      .delete()
      .then(result => {
        console.log(result);
        console.log("delete success!");
        this.modalClose();
        this.updateGrance();
      })
      .catch(err => {
        console.log(err);
        // TODO error
      });
  }

  modalClose() {
    this.dialogOpen = false;
    console.log("close modal.");
  }
}
</script>

<style lang="scss" scoped>
.grance__content {
  background-color: #edf6f6;
}

.t__header {
  display: flex;
  justify-content: flex-end;
  padding-right: 16%;
  margin: 8px;
}

.filter-area {
  padding: 8px;
  margin: 8px;
}

.filter-text {
  padding: 2px;
  border: 2px solid;
  font-size: 0.8em;
  border-color: #e0e0e0;
  height: 32px;
  width: 240px;
  border-radius: 4px;
  box-sizing: border-box;
}

.grance__table--outline {
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 8px;
}
</style>

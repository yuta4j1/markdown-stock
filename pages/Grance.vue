<template>
  <div class="g__container">
      <PostPanelHeader />
      <div v-for="(post, idx) in posts" :key="idx">
        <PostPanel :post="post" />
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'
import { Post } from '../models/Post'
import PostPanel from '../components/PostPanel.vue'
import PostPanelHeader from '../components/PostPanelHeader.vue'

@Component({
    components: { PostPanelHeader, PostPanel }
})
export default class Grance extends Vue {
    posts: Post[] = []
    mounted() {
        vxm.post.fetchPosts().then((data: Post[]) => {
            this.posts = data
        })
    }
}
</script>

<style scoped>

.g__container {
    padding-top: 40px;
}

</style>

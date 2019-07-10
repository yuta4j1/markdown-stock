<template>
  <div class="g__container">
      <div class="table-content" v-for="(post, idx) in posts" :key="idx">
        <PostPanel :post="post" />
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Post } from '../models/Post'
import PostPanel from '../components/PostPanel.vue';

@Component({
    components: { PostPanel }
})
export default class Grance extends Vue {
    posts: Post[] = [
        {
            id: '1',
            title: 'test1',
            content: '',
            ownerId: 'foo',
            remarks: 'AAAAAAAAAA',
            insertDateTime: '2019/06/27 00:00:00',
            updateDateTime: '2019/06/27 00:00:00'
        },
        {
            id: '2',
            title: 'test2',
            content: '',
            ownerId: 'bbbbbbbbbbbbbb',
            remarks: 'testtest',
            insertDateTime: '2019/06/27 00:00:00',
            updateDateTime: '2019/06/27 00:00:00'
        },
        {
            id: '3',
            title: 'test3',
            content: '',
            ownerId: 'hoge',
            remarks: 'CCCCCCCCCCCCCCC',
            insertDateTime: '2019/06/27 00:00:00',
            updateDateTime: '2019/06/27 00:00:00'
        },
        {
            id: '4',
            title: 'test4',
            content: '',
            ownerId: 'fuga',
            remarks: 'dddddddddd',
            insertDateTime: '2019/06/27 00:00:00',
            updateDateTime: '2019/06/27 00:00:00'
        },
        {
            id: '5',
            title: 'test5',
            content: '',
            ownerId: 'yyyy',
            remarks: 'EEEEEEEEEEE',
            insertDateTime: '2019/06/27 00:00:00',
            updateDateTime: '2019/06/27 00:00:00'
        }
    ]
}
</script>

<style scoped>

.g__container {
    padding-top: 40px;
}

</style>

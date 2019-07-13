import { VuexModule, mutation, getter, action, Module } from 'vuex-class-component'
import { Post } from '../../models/Post'
import db from '../../plugins/firestore'

const postsRef = db.collection('posts')

@Module({ namespacedPath: 'post/', target: 'nuxt' })
export default class PostStore extends VuexModule {

    @getter posts: Post[] = []
    @getter onEditPost: Post

    @mutation addPost(aPost: Post) {
        this.posts.push(aPost)
    }

    @mutation setOnEditPost(id: string) {
        this.onEditPost = this.posts.find((p: Post) => p.id === id)
    }

    @mutation renewPosts(newPosts: Post[]) {
        this.posts = newPosts
    }

    @action async fetchPosts() {
        const qSnapshots = await postsRef.get()
        const records = qSnapshots.docs
        const datas = records.map(doc => {
            const d = doc.data()
            return {
                id: d.id,
                title: d.title,
                tags: d.tags,
                content: d.content,
                ownerId: d.ownerId,
                remarks: d.remarks,
                insertDateTime: d.insertDateTime,
                updateDateTime: d.updateDateTime
            }
        })

        this.renewPosts(datas)
        return datas
    }

    get getEditPost() {
        return this.onEditPost
    }

}
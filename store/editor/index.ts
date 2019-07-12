import { VuexModule, getter, mutation, Module } from 'vuex-class-component'

@Module({ namespacedPath: 'editor/', target: 'nuxt' })
export default class EditorStore extends VuexModule {

    @getter onEditingPostId: string

    @mutation setOnEditPostId(id: string) {
        this.onEditingPostId = id
    }

    get getOnEditPostId() {
        return this.onEditingPostId
    }
}
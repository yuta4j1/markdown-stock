import { VuexModule, getter, mutation, Module } from 'vuex-class-component'
import { EditorState } from '../../models/EditorState' 

@Module({ namespacedPath: 'editor/', target: 'nuxt' })
export default class EditorStore extends VuexModule {

    @getter state: EditorState = {
        onEditingPostId: null
    }

    @mutation setOnEditPostId(id: string) {
        this.state = {
            onEditingPostId: id
        }
    }

    get getOnEditPostId(): string {
        return this.state.onEditingPostId
    }
}
import Vuex from 'vuex'
import UserStore from './user'
import PostStore from './post'
import EditorStore from './editor'
import LoadingStore from './loading'

export const store = new Vuex.Store({
    modules: {
        user: UserStore.ExtractVuexModule(UserStore),
        post: PostStore.ExtractVuexModule(PostStore),
        editor: EditorStore.ExtractVuexModule(EditorStore),
        loading: LoadingStore.ExtractVuexModule(LoadingStore)
    }
})

export const vxm = {
    user: UserStore.CreateProxy(store, UserStore),
    post: PostStore.CreateProxy(store, PostStore),
    editor: EditorStore.CreateProxy(store, EditorStore),
    loading: LoadingStore.CreateProxy(store, LoadingStore)
}
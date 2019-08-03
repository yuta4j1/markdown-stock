import { VuexModule, getter, mutation, Module } from 'vuex-class-component'
import { LoadingState } from '../../models/LoadingState' 

@Module({ namespacedPath: 'loading/', target: 'nuxt' })
export default class EditorStore extends VuexModule {

    @getter state: LoadingState = {
        show: true
    }

    @mutation toggleLoading(flag: boolean) {
        this.state = {
            show: flag
        }
    }

    get loadingState() {
        return this.state
    }
}
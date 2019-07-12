import { VuexModule, mutation, getter, Module } from 'vuex-class-component'
import { User } from '../../models/User'

@Module({ namespacedPath: 'user/', target: 'nuxt' })
export default class UserStore extends VuexModule {
    @getter userInfo: User = {
        uid: '',
        name: '',
        email: ''
    }

    @mutation setUserInfo(user: User) {
        this.userInfo = user
    }

    get fetchUser() {
        return this.userInfo
    }
}

export const user = UserStore.ExtractVuexModule(UserStore)
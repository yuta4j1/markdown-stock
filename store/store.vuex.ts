import Vuex from 'vuex'
import { UserStore } from './user'

export const store = new Vuex.Store({
    modules: {
        user: UserStore.ExtractVuexModule(UserStore),
    }
})

export const vxm = {
    user: UserStore.CreateProxy(store, UserStore)
}
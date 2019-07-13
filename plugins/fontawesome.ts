import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen)
library.add(faEllipsisH)

Vue.component('font-awesome-icon', FontAwesomeIcon)
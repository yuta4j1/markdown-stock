import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEllipsisH, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faEllipsisH, faLayerGroup)

Vue.component('font-awesome-icon', FontAwesomeIcon)
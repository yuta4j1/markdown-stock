<template>
  <div class="login-form">
      <button @click="onClick">googleアカウントでログインする</button>
      <div v-if="existsUserInfo">
        <p>User Name: {{ userInfo.name }}</p>
        <p>User Email: {{ userInfo.email }}</p>
      </div>
  </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '../plugins/firebase'
import { vxm } from '../store/store.vuex'
import { User } from '../models/User'

@Component
export default class Login extends Vue {

    private userInfo: User = {
        uid: '',
        name: '',
        email: ''
    }

    get existsUserInfo() {
        return this.userInfo !== void 0
    }

    onClick() {
        const provider = new firebase.auth.GoogleAuthProvider
        provider.addScope('profile')
        provider.addScope('email')
        firebase.auth().signInWithPopup(provider).then(result => {
            const user = result.user
            vxm.user.setUserInfo({ uid: user.uid, name: user.displayName, email: user.email })
            this.userInfo = vxm.user.fetchUser
        })
        // firebase.auth().signInWithRedirect(provider).then(resolve => {
        //     firebase.auth().getRedirectResult().then(function(result) {
        //     const user = result.user
        //     console.log(user)
        //     this.mutationUser({ name: user.displayName, email: user.email })
        //     this.userInfo = this.getUserInfo()
        // }).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        // })

        // })
        
    }

}
</script>
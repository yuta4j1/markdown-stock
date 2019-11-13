<template>
  <div class="login-form__content">
    <div class="login-form__card--outline">
      <div class="login-form__title">Markdown Stock</div>
      <div class="login-form__centering-wrapper">
        <font-awesome-icon icon="layer-group" size="4x" />
      </div>
      <div v-if="existsUserInfo">
        <p>User Name: {{ userInfo.name }}</p>
        <p>User Email: {{ userInfo.email }}</p>
      </div>
      <div class="login-form__centering-wrapper">
        <button class="login-form__oauth-button" @click="onClick">googleアカウントでログインする</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "../plugins/firebase";
import { vxm } from "../store/store.vuex";
import { User } from "../models/User";

@Component
export default class Login extends Vue {
  private userInfo: User = {
    uid: "",
    name: "",
    email: ""
  };

  get existsUserInfo() {
    return this.userInfo !== void 0;
  }

  onClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        vxm.user.setUserInfo({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        });
        this.userInfo = vxm.user.fetchUser;
      });
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

<style lang="scss" scoped>
.login-form__content {
  display: flex;
  justify-content: center;
}

.login-form__title {
  font-size: 1.7rem;
  text-align: center;
  font-family: "Quicksand", sans-serif;
}

.login-form__centering-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px 0px 24px 0px;
}

.login-form__card--outline {
  position: relative;
  top: 80px;
  width: 40%;
  height: 50%;
  padding: 24px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login-form__oauth-button {
  padding: 12px;
  text-align: center;
  font-size: 0.8em;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  background-color: #36ccba;
}
</style>
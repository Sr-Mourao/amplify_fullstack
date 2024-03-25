import { defineStore } from "pinia";
import { signIn, signOut } from "aws-amplify/auth";

export const authAmplify = defineStore("auth", {
  state: () => ({
    auth: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      await signIn(username, password);
    },
    async handleSignOut() {
      await signOut();
    },
    userAuthenticated() {
      this.isAuthenticated = true;
    },
  },
});

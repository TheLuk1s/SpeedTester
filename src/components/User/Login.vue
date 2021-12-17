<template>
  <div>
    <b-form>
      <b-input-group prepend="@">
        <b-form-input
          v-model="email"
          placeholder="El. pašto adresas"
          :state="isInvalid('email')"
        ></b-form-input>
      </b-input-group>

      <b-form-input
        v-model="password"
        placeholder="Slaptažodis"
        type="password"
        class="my-3"
        :state="isInvalid('password')"
      ></b-form-input>

      <b-button
        v-on:click="login"
        squared
        variant="outline-secondary float-right"
        >Prisijungti</b-button
      >
    </b-form>
  </div>
</template>

<script>
// Essentials
import axios from "axios";

// Defaults
export default {
  name: "Login",
  props: {},
  data() {
    return {
      email: null,
      password: null,

      triesToLogin: 0,
      invalidFields: 0,
    };
  },
  methods: {
    login() {
      this.invalidFields++;

      axios
        .post(
          "https://dalykai.herokuapp.com/api/auth/login",
          {},
          {
            params: {
              email: this.email,
              password: this.password,
            },
          }
        )
        .then((response) => {
          localStorage.token = response.data.access_token;
          localStorage.name = response.data.user.name;
          localStorage.role = response.data.user.role;

          window.location.reload();
        })
        .catch((error) => {});
    },
    isInvalid(element) {
      if (!this[element] && this.invalidFields > 0) {
        return false;
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
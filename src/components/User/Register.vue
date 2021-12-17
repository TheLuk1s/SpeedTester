<template>
  <div>
    <b-form class="d-flex justify-content-between" inline>
      <b-form-input
        v-model="name"
        class="my-3 pr-inputs-inline"
        placeholder="Vardas"
      ></b-form-input>
      <b-form-input
        v-model="surname"
        class="my-3 pr-inputs-inline"
        placeholder="Pavardė"
      ></b-form-input>
    </b-form>
    <b-form>
      <b-input-group prepend="@">
        <b-form-input
          v-model="email"
          type="email"
          placeholder="El. pašto adresas"
        ></b-form-input>
      </b-input-group>

      <b-form-input
        v-model="password"
        placeholder="Slaptažodis"
        type="password"
        class="my-3"
      ></b-form-input>

      <b-button
        :disabled="successful"
        v-on:click="register"
        squared
        variant="outline-secondary float-right"
        >Registruotis</b-button
      >
    </b-form>
  </div>
</template>

<script>
// Essentials
import axios from "axios";

// Defaults
export default {
  name: "Register",
  props: {},
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null,

      triesToRegister: 0,
      invalidFields: 0,
      successful: false,
    };
  },
  methods: {
    register() {
      axios
        .post(
          "https://dalykai.herokuapp.com/api/auth/register",
          {},
          {
            params: {
              name: this.name + " " + this.surname,
              email: this.email,
              password: this.password,
              password_confirmation: this.password,
            },
          }
        )
        .then((response) => {
          this.successful = true;
          this.$bvToast.toast(
            "Registracija įvyko sėkmingai. Galite prisijungti.",
            {
              solid: true,
              title: "Pavyko!",
              variant: "success",
              toaster: "b-toaster-bottom-right",
            }
          );
        })
        .catch((error) => {
          this.$bvToast.toast("Registracija nepavyko.", {
            solid: true,
            title: "Klaida!",
            variant: "danger",
            toaster: "b-toaster-bottom-right",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.pr-inputs-inline {
  padding-right: 2.6rem !important;
}
</style>
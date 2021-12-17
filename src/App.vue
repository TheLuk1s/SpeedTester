<template>
  <div id="app">
    <Navbar name="Klausimynas" />

    <!-- UserModals -->
    <b-modal id="modalLogin" title="Prisijungimas" hide-footer>
      <Login />
    </b-modal>
    <b-modal id="modalRegister" title="Registracija" hide-footer>
      <Register />
    </b-modal>

    <!-- Router -->
    <router-view></router-view>
  </div>
</template>

<script>
// Components
import Navbar from "./components/Navbar";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

// Defaults
export default {
  name: "App",
  components: {
    Navbar,
    Login,
    Register,
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Francois+One&display=swap')
body
  background: #EEEEEE
  font-family: 'Bebas Neue', cursive

  input
    font-family: 'Francois One', sans-serif
.btn-primary
  background-color: #476072
  border-color: #476072

  &:hover, &:focus, &:active
    background-color: #476072 !important
    border-color: #476072 !important
    opacity: 0.9

.btn-secondary
  background-color: #548CA8
  border-color: #548CA8

  &:hover, &:focus, &:active
    background-color: #548CA8 !important
    border-color: #548CA8 !important
    opacity: 0.9

.btn-outline-primary
  color: #476072
  border-color: #476072 !important
  box-shadow: none !important

  &.active, &:hover
    color: #fff
    background-color: #476072 !important
  &:hover
    opacity: 0.8
</style>
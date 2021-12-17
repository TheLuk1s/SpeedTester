<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="custom">
      <b-navbar-brand href="#/">
        <b-img :src="logo" class="logo" fluid></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/">Visi klausimynai</b-nav-item>
          <b-nav-item v-if="loggedIn" href="#/createPool"
            >Kurti klausimyną</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!loggedIn" v-b-modal="'modalLogin'" href="#"
            >Prisijungti</b-nav-item
          >
          <b-nav-item v-if="!loggedIn" v-b-modal="'modalRegister'" href="#"
            >Registruotis</b-nav-item
          >
          <b-nav-item
            v-if="loggedIn"
            class="icon-logout"
            v-on:click="logout"
            href="#"
          >
            <span class="d-lg-none"> Atsijungti </span>
            <span class="d-none d-lg-block">
              <b-icon icon="door-open" aria-hidden="true"></b-icon>
            </span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loggedIn: this.initializeLoggedInCheck(),
      logo: require("../assets/logo.svg"),
    };
  },
  methods: {
    logout() {
      delete localStorage.token;
      delete localStorage.name;
      delete localStorage.role;

      this.loggedIn = false;
    },
    initializeLoggedInCheck() {
      const token = localStorage.token;

      if (typeof token != "undefined") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-brand {
  max-width: 150px;
  .logo {
    filter: invert(100%);
  }
}

.custom {
  background-color: #334257;
}

.icon-logout {
  &:hover {
    animation: wobble;
    animation-duration: 0.3s;
  }
}
</style>
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "vue-router";
import "animate.css";

// Bootstrap
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Views
import Home from "./views/Home";
import CreatePool from "./views/CreatePool";
import AnswerPool from "./views/AnswerPool";

// Routes
const routes = [
  { path: "/", component: Home },
  { path: "/createPool", component: CreatePool },
  { path: "/answerPool/:pollID", component: AnswerPool }
];

const router = new Router({
  routes
});

Vue.use(BootstrapVue).use(BootstrapVueIcons).use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  el: "#app",
  components: { App },
  template: "<App/>"
});

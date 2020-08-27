import App from "@/App.vue";
import Icons from "@/components/Icons.vue";
import Layout from "@/components/Layout.vue";
import Nav from "@/components/Nav.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import Vue from "vue";

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icons", Icons);



 new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Snotify from 'vue-snotify';

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(Snotify);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/scss/common.scss';
import '@/plugins/element.js';
import '@/components/Card';

import '@/assets/scripts/permission'; 

import goBack from '@/assets/scripts/utils/goBack.js'; 
Vue.prototype.$goBack = goBack;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

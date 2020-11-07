import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

export const EventBus = new Vue();

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:8090';

new Vue({
  render: h => h(App),
}).$mount('#app');

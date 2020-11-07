import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import Board from './components/Board.vue'
import ChooseLobby from './components/ChooseLobby.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);

axios.defaults.baseURL = 'http://localhost:8090';

const routes = [
    {
        path: '/',
        name: "ChooseLobby",
        component: ChooseLobby
    },
    {
        path: '/game/:id',
        name: "Board",
        component: Board
    }
];

const router = new VueRouter({
    routes

});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

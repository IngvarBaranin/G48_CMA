import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import Board from './components/Board.vue'
import ChooseLobby from './components/ChooseLobby.vue'
import JoinLobby from './components/JoinLobby.vue'
import CreateLobby from "./components/CreateLobby";

Vue.config.productionTip = false;
Vue.use(VueRouter);

axios.defaults.baseURL = 'https://changemakersadventure.herokuapp.com/';

const routes = [
    {
        path: '/',
        component: ChooseLobby,
        children: [
            {
                path: "",
                component: JoinLobby
            },
            {
                path: '/create',
                component: CreateLobby
            },
        ]
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

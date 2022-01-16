import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import 'es6-promise';

// Variable global de vue, $ est la convention Vue pour éviter de se perdre
const APIurl = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'http://mecamobile.fr/api';
Vue.prototype.$http = axios.create({
    baseURL: APIurl,
    headers: {
        common: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    }
});

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');

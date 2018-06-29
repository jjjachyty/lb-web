// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filter from './filter'
import api from './api'
import Vuetify from 'vuetify'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//图片预览
import Viewer from 'v-viewer'
Vue.use(Viewer)

import VueShowdown from 'vue-showdown'
Vue.component('VueShowdown', VueShowdown)

// use
Vue.use(mavonEditor)
Vue.use(Croppa);

Vue.use(Vuetify, {
    theme: {
        primary: '#009688',
        secondary: '#FF5722',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = api


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
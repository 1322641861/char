import App from './App'
import io from "@/utils/weapp.socket.io.js"
import mescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue"

import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.socket = io("http://192.168.3.12:1401");
Vue.component('mescroll-body', mescrollBody);
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

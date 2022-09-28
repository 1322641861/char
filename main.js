import App from './App'
import io from "@/utils/weapp.socket.io.js"
import mescrollBody from "@/components/mescroll-uni/components/mescroll-body/mescroll-body.vue"
import mescrollUni from "@/components/mescroll-uni/components/mescroll-uni/mescroll-uni.js"

import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.socket = io("http://192.168.3.12:1401");
Vue.component('mescroll-body', mescrollBody);
Vue.component('mescroll-body', mescrollUni);
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

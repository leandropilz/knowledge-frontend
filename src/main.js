import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

//TEMPORARIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkxlYW5kcm8gUGlseiIsImVtYWlsIjoibGVhbmRyby5waWx6ekBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTYxNTUxMzg1LCJleHAiOjE1NjE4MTA1ODV9.mfYwV-FKJUdnKU4j2Tm-6o2igN2NSa24OtQCUfRMzXM'

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
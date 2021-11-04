import Vue from 'vue'
import App from './App.vue'

import PieChart from '../package/PieChart'
Vue.use(PieChart)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App'
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'
import animate from 'animate.css'


Vue.use(mintUI);
window.Toast=Toast;
window.MessageBox=MessageBox;
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

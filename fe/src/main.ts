import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Toast, Dialog, Loading } from 'vant'

const app = createApp(App)

app.use(router)
app.use(store)

// app.use(Toast)
// app.use(Dialog)
// app.use(Loading)

app.mount('#app')

// Vue.prototype.uploadFile = process.env.NODE_ENV === 'development'
//   ? 'http://localhost:8091/tour/user/changeUserHeadpic'
//   : 'https://api.0351zhuangxiu.com/tour/user/changeUserHeadpic'

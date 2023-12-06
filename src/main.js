import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'; /* 引入了 css 文件，所以需要 css loader 进行处理 */
import { Button } from 'element-ui';
import '@/style/index.scss' // scss 文件 所以需要 sass-loader 进行加载处理, webpack才能认识 然后才可以正确得打包他

import Foo from '@/views/Foo.vue'
const Bar = () => import(/* webpackChunkName: "group-bar" */ './views/Bar.vue') // 异步加载文件

Vue.use(VueRouter).use(Button)

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

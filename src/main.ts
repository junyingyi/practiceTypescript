import { Component, Vue } from 'vue-property-decorator';
import App from './App.vue';
import { router } from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

import { plugins } from '@/plugins'; // 引入全局插件
import '@/assets/style/base.less';
import '@/assets/style/mixin.less';
import '@/assets/style/animate.less';
import '@/assets/style/eleme.less';
Vue.config.productionTip = false;

import Vconsole from 'vconsole';

Vue.use(plugins);

// 注册组件内的导航钩子
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

// let local: any =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjgiLCJzdWIiOiI4IiwianRpIjoiNTczYzliYjYtNmNkZC00YzBhLTlhMDgtMTY5MTczNDUxODk4IiwiaWF0IjoxNTU0Nzk5NzQ0LCJuYmYiOjE1NTQ3OTk3NDQsImV4cCI6MTU1NTQwNDU0NCwiaXNzIjoieXliIiwiYXVkIjoieXliIn0.wFR__P64h5ho4Xo7uv2ZrMBS1jcRJi2vQFWNurUROnw';
// if (!localStorage.getItem('at_token')) {
//   localStorage.setItem('at_token', local);
// }
// if (process.env.VUE_APP_EVN !== 'production') {
// new Vconsole(); //打开测试
// }

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

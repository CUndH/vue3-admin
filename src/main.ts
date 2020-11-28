import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import '@/styles/main.scss';

createApp(App).use(store).use(Antd).use(router)
  .mount('#app');

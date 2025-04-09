import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Импортируем маршруты

createApp(App)
  .use(router) // Подключаем маршруты
  .mount('#app');

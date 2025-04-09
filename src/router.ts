import { createRouter, createWebHistory } from 'vue-router';
import StartPage from './components/DocumentList.vue'; // Список документов
import HelloWorld from './components/Doc_Agreement_copyright.vue'; // Страница создания документа


const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/create/:documentName',
    name: 'HelloWorld',
    component: HelloWorld,
    props: true // Передаем параметры через props
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

export default router;

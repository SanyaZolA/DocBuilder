import { createRouter, createWebHistory } from 'vue-router';
import DocumentList from './components/DocumentList.vue'; // Список документов
import Doc_Agreement_copyright from './components/Doc_Agreement_copyright.vue'; // Страница создания документа


const routes = [
  {
    path: '/',
    name: 'DocumentList',
    component: DocumentList
  },
  {
    path: '/:internalName',
    name: 'Doc_Agreement_copyright',
    component: Doc_Agreement_copyright,
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

export default router;

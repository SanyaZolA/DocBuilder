import { createRouter, createWebHistory } from 'vue-router';
import DocumentList from './views/DocumentList.vue'; // Список документов
import Doc_personal_data from './views/Doc_personal_data.vue';  // Страница создания документа



const routes = [
  {
    path: '/',
    name: 'DocumentList',
    component: DocumentList
  },
  {
    path: '/Doc_personal_data.docx',
    component: Doc_personal_data,
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

export default router;

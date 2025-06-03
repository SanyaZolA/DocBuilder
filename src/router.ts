import { createRouter, createWebHistory } from 'vue-router';
import DocumentList from './views/DocumentList.vue'; // Список документов
import Doc_Agreement_copyright from './views/Doc_Agreement_copyright.vue';  // Страница создания документа
import Doc_Bit_copyright from './views/Doc_Bit_copyright.vue';  // Страница создания документа



const routes = [
  {
    path: '/',
    name: 'DocumentList',
    component: DocumentList
  },
  {
    path: '/Doc_Agreement_copyright.docx',
    component: Doc_Agreement_copyright,
  },
    {
    path: '/Doc_Bit_copyright.docx',
    component: Doc_Bit_copyright,
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

export default router;

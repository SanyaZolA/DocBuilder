<!-- src/views/DocumentList.vue -->
<template>
  <div>
    <h1>Список шаблонов</h1>

    <ul>
      <li v-for="(document, index) in documents" :key="index">
        <router-link :to="`/create/${document.fileName}`">
          {{ document.displayName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const documents = ref([
  { fileName: 'Doc_Agreement_copyright.docx', displayName: 'Договор отчуждения авторское' },
  { fileName: 'Report_Sample.docx', displayName: 'Sample Report' },
  { fileName: 'Contract_Term_Notice.docx', displayName: 'Contract Term Notice' },
]);
</script>

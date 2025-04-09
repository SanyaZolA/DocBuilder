<template>
  <div>
    <h1>Выберите шаблон</h1>
    <ul>
      <li v-for="(doc, index) in documentList" :key="index">
        <button @click="goToDocument(doc.internalName)">
          {{ doc.displayName }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { documentList } from '../data/documentList'; 

const router = useRouter();

const goToDocument = (internalName: string) => {
  router.push(`/${internalName}`); // Переход на страницу документа
};
</script>


<style scoped>
/* Стили для компонента */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

button {
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>

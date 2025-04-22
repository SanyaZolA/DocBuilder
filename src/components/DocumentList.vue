<template>
  <div class="document-list">
    <h1>Выберите шаблон</h1>
    <ul class="document-list__items">
      <li v-for="(doc, index) in documentList" :key="index" class="document-list__item">
        <button @click="goToDocument(doc.internalName)" class="document-list__button">
          {{ doc.displayName }}
        </button>
        <button class="document-list__button" type="button" disabled>send</button>
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
/* Стили для документа */

button:disabled {
  background-color: #515050;
  color: #666;
  animation: none;
  transform: none;
  background-color: none;
  cursor: not-allowed;
  pointer-events: none;
}

button:disabled:hover {
  background-color: #ccc;
  color: #3d3b3b;
  animation: none;
  transform: none;
  background-color: none;
}

.document-list {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 50px;
  color: #d3cdd1;
}

.document-list__items {
  list-style-type: none;
  padding: 0;
}

.document-list__item {
  margin: 10px 0;
}

.document-list__button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.document-list__button:hover {
  background-color: #76b1ed;
  transform: translateY(-2px);
}

.document-list__button:focus {
  outline: none;
}
</style>
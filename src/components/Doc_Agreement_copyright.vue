<!-- src/views/DocumentEditor.vue -->
<template>
  <div>
    <h1>Editing: {{ documentName }}</h1>

    <!-- Форма для ввода данных -->
    <div>
      <label for="first_name">First Name:</label>
      <input type="text" v-model="formData.first_name" />

      <label for="last_name">Last Name:</label>
      <input type="text" v-model="formData.last_name" />

      <label for="age">Age:</label>
      <input type="number" v-model="formData.age" />
    </div>

    <button @click="generateDocument">Generate Document</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const route = useRoute();
const documentName = route.params.documentName as string; // Получаем название документа из URL
const formData = ref({
  first_name: '',
  last_name: '',
  age: '',
});

// Функция для генерации докуме нта
const generateDocument = async () => {
  try {
    // Загружаем шаблон по имени файла
    const response = await fetch(`/templates/${documentName}`);
    const arrayBuffer = await response.arrayBuffer();

    // Используем Pizzip и Docxtemplater для обработки документа
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);

    doc.setData(formData.value);
    doc.render();

    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `generated-${documentName}`);
  } catch (error) {
    console.error('Error generating document:', error);
  }
};
</script>

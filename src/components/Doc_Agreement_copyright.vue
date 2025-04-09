<template>
  <div>
    <h1>{{ displayName }}</h1>
    <div class="form">
      <h2>Реквизиты договора</h2>
      <label for="first_name">Номер договора</label>
      <input type="text" v-model="formData.first_name" />

      <label for="last_name">Дата договора</label>
      <input type="text" v-model="formData.last_name" />

      <label for="age">Срок договора</label>
      <input type="number" v-model="formData.age" />
    </div>
    <div class="formAll">
    <div class="form">
      <h2>Лицензиар</h2>
      <label for="first_name">ФИО</label>
      <input type="text" v-model="formData.first_name" />

      <label for="last_name">Псевдоним</label>
      <input type="text" v-model="formData.last_name" />

      <label for="age">Age:</label>
      <input type="number" v-model="formData.age" />
    </div>
    <div class="form">
      <h2>Лицензит</h2>
      <label for="first_name">First Name:</label>
      <input type="text" v-model="formData.first_name" />

      <label for="last_name">Last Name:</label>
      <input type="text" v-model="formData.last_name" />

      <label for="age">Age:</label>
      <input type="number" v-model="formData.age" />
    </div>
    </div>
    <button @click="generateDocument">создание документа</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'; // Импортируем useRoute для получения параметров маршрута
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { documentList } from '../data/documentList'; // Подключаем список документов

const route = useRoute(); // Получаем доступ к параметрам маршрута

const internalName = route.params.internalName as string; // Параметр маршрута fileName
const formData = ref({
  first_name: '',
  last_name: '',
  age: '',
});

// Вычисляем отображаемое имя документа
const displayName = computed(() => {
  const doc = documentList.find(d => d.internalName === internalName);
  return doc?.displayName ?? 'Документ не найден'; // Если не нашли документ, выводим сообщение
});

// Функция для генерации документа
const generateDocument = async () => {
  try {
    console.log(`Загружаем шаблон с пути: /templates/${internalName}`);

    // Загружаем шаблон по имени файла
    const response = await fetch(`/templates/${internalName}`);
    
    // Проверяем, что файл найден
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке файла: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Проверяем содержимое файла
    console.log('Файл загружен, размер:', arrayBuffer.byteLength);

    // Используем Pizzip и Docxtemplater для обработки документа
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);

    doc.setData(formData.value);
    doc.render();

    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `${displayName.value} ${formData.value.first_name}.docx`);  
  } catch (error) {
    console.error('Ошибка при генерации документа:', error);
  }
};

</script>

<style scoped>
.formAll{
  display: flex;
  justify-content: space-between;
}
.form {
  display: flex;  
    flex-direction: column;
    align-items: center;
}

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


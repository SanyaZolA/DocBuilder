<template>
  <div class="document-form">
    <h1>{{ displayName }}</h1>

    <dodvies v-model="formData"/>
    <MusicTable v-model="formData" />

    <div class="formAll">
      <div class="form">
        <h2>Лицензиар</h2>
        <label for="name_licensor">ФИО</label>
        <input type="text" v-model="formData.name_licensor" />

        <label for="last_name">Псевдоним</label>
        <input type="text" v-model="formData.last_name" placeholder="Babangida"/>

        <label for="age">Возраст</label>
        <input type="number" v-model="formData.age" />
      </div>

      <div class="form">
        <h2>Лицензит</h2>
        <label for="first_name">ФИО</label>
        <input type="text" v-model="formData.name_licensor" />

        <label for="last_name">Псевдоним</label>
        <input type="text" v-model="formData.last_name" placeholder="Babangida" />

        <label for="age">Возраст</label>
        <input type="number" v-model="formData.age" />
      </div>
    </div>

    <button @click="generateDocument">Создание документа</button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'; // Импортируем useRoute для получения параметров маршрута
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { documentList } from '../data/documentList'; // Подключаем список документов
import dodvies from '../views/dodvies.vue';
import MusicTable from '../views/musicTable.vue';

const route = useRoute(); // Получаем доступ к параметрам маршрута

const internalName = route.params.internalName as string; // Параметр маршрута fileName

const formData = ref({
  name_licensor: '',
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
    saveAs(output, `${displayName.value} ${formData.value.name_licensor}.docx`);  
  } catch (error) {
    console.error('Ошибка при генерации документа:', error);
  }
};

</script>

<style >
.document-form {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #34495e;
}

.form {
  margin-bottom: 20px;
}

.form label {
  font-size: 1rem;
  margin-bottom: 8px;
  display: block;
  color: #7f8c8d;
}

.form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background-color: #46454f;
  color: rgb(187, 167, 167);
}

input::placeholder {
  color: #e8c9c957;
  font-style: italic;
}

.form input:focus {
  outline: none;
  border-color: #3498db;
}

.formAll {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.formAll .form {
  flex: 1;
}

button {
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

button:focus {
  outline: none;
}
</style>